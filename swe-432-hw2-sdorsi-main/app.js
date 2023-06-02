const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000

const base_url = 'http://www.songsterr.com/a/ra/songs.json?pattern=';
const artist_url = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists='

var cachedSearch=[]; //for basic queries
var cachedArtists=[]; //Artist search cache
var cachedRecent=[];
var favorites=[];
var bigHits=[];
var complete = 0;
const topArtists = ["Metallica","Guns N Roses","Ozzy Osbourne","Megadeth","AC/DC","Led Zeppelin","Nirvana","Queen"];
var starters = [];//List for default songs preloaded for later use
async function setup(){
  try{
    for(label of topArtists){
      await fetch(base_url+label).then((response) => {
        return response.json()}).then((info) => {
          for(let i=0;i<5;i++){
            starters.push(info[i]);
        }
      });
    }
  }catch{
    console.log("failed to set up default list");
  }
  //console.log("setup complete");
  bigHits = starters.map(x => new Song(x.title,x.id,x.artist.name,x.artist.id));
  console.log("complete");
  complete=1;
};
setup();

//Used to store a list of songs under one artist or tag, with similar search results saved to the same tag and song list.
class SavedSearch{
  constructor(name,songList){
    this.name = name;
    this.songList = songList;
    this.searches = []
  }

  addSearch(word)//returns false if the search word already exists in the list
  {
    for(let pastSearched of this.searches)
      if(word==pastSearched)
        return false;//if it already exists, don't add it
  
    this.searches.push(word);
    return true;
  }

  getSearches(){
    return this.searches;
  }

  getName(){
    return this.name;
  }

  getSongs(){
    return this.songList;
  }

  add(song)
  {
    if(typeof(song)==Song)
    {
      this.songList.push(song);
      return;
    }

    if(typeof(song)==Array)
    {
      for(let s of songs)
      {
        this.songList.push(s);
      }
    }
  }
}

//Simplified Song object with the necessary information pulled from the API json to be used for our own endpoints
class Song{
  constructor(name,name_id,artist,artist_id)
  {
    this.name = name,
    this.name_id = name_id,
    this.artist = artist,
    this.artist_id = artist_id
  } 
  getName(){
    return this.name;
  }

  getId(){
    return this.name_id;
  }

  getArtist(){
    return this.artist;
  }

  getArtistId(){
    return this.artist_id;
  }

  generateURL()
  {
    return 'http://www.songsterr.com/a/wa/song?id='+this.name_id;
  }

  generatePartURL(track)
  {
    var part = ''
    switch(track){
      case 'bass':
        part = 'bass-tab-s'+this.name_id;
        break;
      case 'drum':
        part = 'drum-tab-s'+this.name_id;
        break;
      case 'drums':
        part = 'drum-tab-s'+this.name_id;
        break;
      default:
        part = 's'+this.name_id;
    }

    return 'https://www.songsterr.com/a/wsa/'
    +this.artist.toLowerCase()+'-'
    +this.name.toLowerCase()+'-'
    +part;
  }
}

//Used to find a possibly repeated search in an existing cache.
function getExistingList(cache,currentWord)//checks if the current word has been searched in this cache before
{
  for(let entry of cache)
  {
    for(let word of entry.getSearches())
    {
      if(word == currentWord)
      {
        //return res.json(entry.songList);
        return entry.songList;
      }
    }
  }
  return null;
}

//if the search word used to find this list has already been used, return that list. If not, add the term to that list's searches for future use.
function getListFromSearches(cache, searchList, searchWord)
{
  for(let entries of cache)
  {
     if(entries.getName()==searchList.getName())//if 2 entries by same artist, merge
     {
        entries.addSearch(searchWord);
        return entries.getSongs();
     }
  }
  searchList.addSearch(searchWord);
  cache.push(searchList);
  return null;
}

//finds a single song that "best" matches the title (starter)
function bestFit(title, list){
  for(song of list)//Return a song in the list with the exact matching title, else get closest search result
  {
    if(song.title.toLowerCase() == title.toLowerCase())
      return song;
  }
  return list[0];
}

//finds a single song that "best" matches the title and artist (starter)
function bestFitArtist(title, artist, list){
  artist = artist.toLowerCase().replace('"','/').replace('"','/')
  for(song of list)//Return a song in the list with the exact matching title, else get closest search result
  {
    if(song.title.toLowerCase() == title.toLowerCase() && song.artist.name.toLowerCase() == artist.toLowerCase())
      return song;
  }
  return list[0];
}

function addNoDuplicates(cache, song){
  for(entry of cache)
  {
    if(entry.name_id == song.name_id)
    {
      return cache;
    }
  }
  cache.push(song);
  return cache; 
}

app.get('/', (req, res) => {
  let instructions=['/ => Help page |||| '+
  '/songs/:search => get a list of songs based on :search |||| '+
  '/artist/:artistName => list of songs based on the artist :artistName |||| '+
  '/:title/tabs => returns a url to get the tabs for the song :title, optional query ?part=[bass,drum, or default is guitar] |||| '+
  '/recent => recent list of specific song tabs looked at |||| '+
  '/recommended => list of recommended songs (post and get variations |||| '+
  '/song/:name => returns a single custom Song object that best fits :name |||| '+
  '/favorites => returns a list of favorite songs, or saves a new one to the existing list (get and post)'];
  res.send(instructions);
})

//Returns a list of songs with similar title to ":search"
app.get('/songs/:search',async(req,res)=> {
  let searches = [];
  var key = req.params.search.toLowerCase().replace("\"","").replace("\"","");

  let entryList = getExistingList(cachedSearch,key);
  if(entryList!=null)
  {
    return res.json(entryList);
  }
  
  await fetch(base_url+req.params.search).then((response) => {
    return response.json()}).then((info) => {
    for(let i=0;i<20 && i < info.length;i++)
      searches.push(info[i]);
  });

  try{
    var songs = await searches.map(x => new Song(x.title,x.id,x.artist.name,x.artist.id));
  }catch{return res.send("Invalid Search!");};
  if(songs.length==0){
    return res.send("Invalid Search!");
  }

  let updatedKey = songs[0].getName();//used to identify similar searched if top song matched
  var mySearch = new SavedSearch(updatedKey,songs);
  //If it hasn't been searched before, add to list of words used
  let retVal = getListFromSearches(cachedSearch,mySearch,key);
  if(retVal!=null){
    return res.json(retVal);
  }
  //console.log(cachedSearch);
  return res.json(songs);
})

//Returns a list of songs from the specified artist in ":artistName"
app.get('/artist/:artistName', async(req, res) => {
  //Get songs based on artist using the api
  var artist = req.params.artistName.replace("\"","").replace("\"","");
  let promises=[];
  //if the band has already been searched, return the saved list
  let entryList = getExistingList(cachedArtists,artist)
  if(entryList!=null)
  {
    return res.json(entryList);
  }
  //if not, fetch data and cache it
  
  await fetch(artist_url+req.params.artistName).then((response) => {
    return response.json()}).then((info) => {
    for(let i=0;i<10;i++)
      promises.push(info[i]);
  });

  try{
    var songs = await promises.map(x => new Song(x.title,x.id,x.artist.name,x.artist.id));
  }catch{return res.send("Invalid artist!");};
  if(songs.length==0){
    return res.send("Invalid Search!");
  }
  //done asynch
  var mySearch = new SavedSearch(songs[0].getArtist(),songs);
  
  let retVal = getListFromSearches(cachedArtists,mySearch,artist);
  if(retVal!=null){
    return res.json(retVal);
  }
 
  //console.log(cachedArtists);
  return res.json(songs);
})

//Returns a url for the tabs of the specied part in a query (options: bass, drum, or default guitar)
app.get('/:title/tabs',async(req,res)=>{
  let part = req.query.part;
  let song_name = req.params.title;
  let my_data=[];
  try{
    await fetch(base_url+song_name).then((response)=>{
      return response.json();
    }).then((obj)=>{
      for(let i=0;i<obj.length;i++){
        my_data.push(obj[i]);
      }
    });
  }catch{return res.send("Failed to get tab url");}
  
  let tab_results = bestFit(song_name, my_data);
  //console.log(tab_results);
  let song;
  try{
   song = new Song(tab_results.title,tab_results.id,tab_results.artist.name,tab_results.artist.id);
  }catch{return res.send("Song not available!")}
  cachedRecent=addNoDuplicates(cachedRecent, song);
  if(part==null)
  {    
    return res.json(song.generateURL());
  }
  return res.json(song.generatePartURL(part));
})

//Returns a list of recently searched songs
app.get('/recent', (req,res)=>{
  return res.json(cachedRecent);
})

//Returns a single song based on the title ":name" given
app.get('/song/:name', async(req,res)=>{
  let list = null;
  try{
    await fetch('https://www.songsterr.com/a/ra/songs.json?pattern='+req.params.name).then((response)=>{
      list = response.json();
    })
  }catch{
    return res.send("Song not found");
  }
  let songs = await Promise.resolve(list);
  if(list!=null)
  {
    let song_match = null;
    if(req.query.artist==null)
      song_match = bestFit(req.params.name, songs);
    else
      song_match = bestFitArtist(req.params.name, req.query.artist, songs);
    my_song = new Song(song_match.title,song_match.id,song_match.artist.name,song_match.artist.id);
    cachedRecent=addNoDuplicates(cachedRecent, my_song);
    return res.json(my_song);
  }
  return res.send("Song not available");
})

//Returns a saved list of favorite songs
app.get('/favorites', (req,res)=>{
  return res.json(favorites);
})

//Adds a song to the list of favorites, to be implemented with persistant data
app.post('/favorites', (req,res)=>{
  let artist_name;
  try{
  artist_name = req.body.song.artist;
  }catch{return res.json("No list available");}
  let songObj =[req.body.song];
  for(entry of favorites)
  {
    if(entry.name == artist_name)
    {
      entry.addSong(songObj);
    }
  }
  favorites.push(new SavedSearch(artist_name,songObj));
  return res.send("Favorites successfully added!");
})

//Recommended song list based on the favorite list, unless there are no favorites where it will use the preloaded list
app.get('/recommended', async(req,res)=>{
  let recList = [];
  while(complete!=1)//if setup not yet complete
  {
    await new Promise (res => setTimeout (res, 500));
  }
  let listToUse = bigHits;
  if(favorites.length > 0){//get songs with same artists based on favorites if you have them
    for(artist of favorites){
      await fetch('https://www.songsterr.com/a/ra/songs.json?pattern='+artist).then((response)=>{
        return response.json();}).then((info)=>{
          for(i=0;i<5;i++)
          {
            recList.push(info[i]);
          }
        })
    }
    listToUse = recList;
  }
  return res.json(listToUse);
})

//Allows a list of names given to be used to as recommendations instead
app.post('/recommended',async(req,res)=>{
  let recList = [];
  let listToUse = [];
  try{
   listToUse = req.body.name;
  }catch{return res.json(bigHits);}
  //get songs with same artists based on sent songs if you have them
  for(artist of listToUse){
    await fetch('https://www.songsterr.com/a/ra/songs.json?pattern='+artist).then((response)=>{
      return response.json();}).then((info)=>{
        for(i=0;i<5;i++)
        {
          recList.push(info[i]);
        }
      })
    
  }
  return res.json(recList);
})

module.exports = app;