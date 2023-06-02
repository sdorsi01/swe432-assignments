const express = require('express')
const fetch = require('node-fetch')
const path = require('path');
const admin = require('firebase-admin'); 
const app = express();
const process = require('process');
const { sign } = require('crypto');

app.use(express.static(path.join(__dirname, 'client/build')));

// Firebase starter code appears below
require("dotenv").config();
let serviceAccount = process.env.FIREBASE_KEY;
admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

const base_url = 'http://www.songsterr.com/a/ra/songs.json?pattern=';
const artist_url = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists='
 //SETUP from HW2
const topArtists = ["Metallica","Guns N Roses","Ozzy Osbourne","Megadeth","AC/DC","Led Zeppelin","Nirvana","Queen"];
var starters = [];//List for default songs preloaded for later use

var defaultList = []; //used to persist the base list of general songs
var complete = 0;
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
  defaultList = starters.map(x => new Song(x.title,x.id,x.artist.name,x.artist.id));
  await persistCache(defaultList,"songs");
  //console.log("complete");
  complete=1;
};
setup();

//FROM HW2
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

function persistCache(cache,collection)
{
  var listAdded=[];
  for(song of cache)
    {
      let docRef =db.collection(collection).doc(""+song.name_id).set({ //db.collection(collection).doc(""+song.artist_id).collection("songs").doc(""+song.name_id).set({
        name: song.name,
        name_id: song.name_id,
        artist: song.artist,
        artist_id: song.artist_id,
        url_tab: song.generateURL(),
        url_tab_bass: song.generatePartURL("bass"),
        url_tab_drum: song.generatePartURL("drum")
      });
      listAdded.push(docRef);
    }
    return listAdded;
}

//Will use a persistant cache instead
app.get('/bySong',async(req,res)=>{
  while(complete!=1)//if setup not yet complete
  {
    await new Promise (res => setTimeout (res, 500));
  }
  //get songs in order by name
  let recentList = await (await db.collection("songs").orderBy("name").get());
  let list = [];
  for(let song of recentList.docs){
    list.push(song.data());
  }
  return res.json(list);
})

app.get('/byArtist',async(req,res)=>{
  while(complete!=1)//if setup not yet complete
  {
    await new Promise (res => setTimeout (res, 500));
  }
  //get songs in order by artist
  let recentList = await (await (await db.collection("songs").orderBy("artist").get()));
  let list = [];
  for(let song of recentList.docs){
    list.push(song.data());
  }
  return res.json(list);
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;