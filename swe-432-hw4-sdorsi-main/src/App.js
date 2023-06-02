import React, { /*Component,*/ useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  /*Routes as Switch,
  Route,*/
  Link}
 from 'react-router-dom';
 
function App() {
  // Initialize states
 const [page,setPage] = useState(0);
 const [songs,setSongs] = useState([]);
 const [recent,setRecent] = useState([]);
 const [favorites,setFavorites] = useState([]);
 const [recommended,setRecommended] = useState([]);
 
 const base_url = 'https://www.songsterr.com/a/ra/songs.json?pattern=';

  const SongObj = (x) => {
    return{
    title : x.title,
    id : x.id,
    artist : x.artist.name,
    artist_id : x.artist.id}
    }

    const urlLinks = (song,track) =>
    {
      var part = ''
      switch(track){
        case 'bass':
          part = 'bass-tab-s'+song.id;
          break;
        case 'drum':
          part = 'drum-tab-s'+song.id;
          break;
        case 'drums':
          part = 'drum-tab-s'+song.id;
          break;
        default:
          part = 'tab-s'+song.id;
      }
  
      return 'https://www.songsterr.com/a/wsa/'
      +song.artist.replace('%20', '-').toLowerCase()+'-'
      +song.title.replace('%20', '-').toLowerCase()+'-'
      +part;
    }

    const setupRecommended = async(list) =>{/*handler*/
      let starters = [];
      try{//recommended is 3x favorite list based on previous authors added
        for(let entry of list){
          await fetch(base_url+entry.artist).then((response) => {
            return response.json()}).then((info) => {
              for(let i=0;i<3;i++){
                starters.push(info[i]);
            }
          });
        }
      }catch{
        console.log("failed to set up default list");
      }
      let songSet = starters.map(newSong =>  SongObj(newSong));
        setRecommended([...songSet]);
    };

    const  getSongs = async(e) =>{/*handler*/
      if(page!=0)
        setPage(0);
      
      let test1 =[];
    try{
      await fetch(base_url+e.target.value)
      .then((res) =>{return res.json()})
      .then((list) => {
          for(let song of list){
            test1.push(song);
          }
        });
      }catch{{setSongs([{title:'No songs found, try typing the full name of what you want. ',id:'',artist:e.target.value,artist_id:''}])}
    }
        let songSet = test1.map(newSong =>  SongObj(newSong));
        if (songSet.length == 0){setSongs([{title:'No songs found, try typing the full name of what you want. ',id:'',artist:e.target.value,artist_id:''}])}
        else
        setSongs([...songSet]);
    }

    const updateTransition =(newPage)=> {
      var el = document.querySelector("div.box"+page);
      el.className = "box"+newPage;
      return el;
    }
    
  const handleClick = (page) => {/*handler*/
  //var intervalID = window.setInterval(updateTransition,7000);
    setPage(page);
    updateTransition(page);
  }

  const addClicked = (song) =>{/*handler*/
    var list = [...recent];
    list.push(song);
    if(list.length>50){//Only keep most recent 50 songs in history
      list.shift();      
    }
    setRecent(list);

    list = [...favorites];
    list.push(song);
    setFavorites(list);

    setupRecommended(list);
  }

  const removeClicked = (song) =>{/*handler*/
    var list = [...favorites];
    let index = favorites.indexOf(song);
    if(index>-1){
      list.splice(favorites.indexOf(song),1);
      setFavorites(list);
    }
  }

  const setTitle=()=>{/*handler*/
    if(page==0){
      return <h2>Home</h2>
    }
    if(page==1){
      return  <h2>Favorites</h2>
    }
    if(page==2){
      return <h2>Recommended</h2>
    }
    if(page==3){
      return <h2>History</h2>
    }
  }

 
  
  const handleList = () =>{/*handler*/
  
    if(page==0){
      return songs;
    }
    if(page==1){
      return favorites;
    }
    if(page==2){
      return recommended;
    }
    if(page==3){
    return recent;
    }
    return songs;
  }

  const getAction = () =>{/*handler*/
    if(page==1)
      return handleList().map((song,index)=>(
        <ul><input type='Button' value={"-"} onClick={()=>removeClicked(song)}/>&emsp;<a href={urlLinks(song,'')}>Guitar</a> | <a href={urlLinks(song,'bass')}>Bass</a> | <a href={urlLinks(song,'drum')}>Drum</a><hr color='black'/></ul>));
       
      return handleList().map((song)=>(
          <ul><input type='Button' value={"+"} onClick={()=>addClicked(song)}/>&emsp;<a href={urlLinks(song,'')}>Guitar</a> | <a href={urlLinks(song,'bass')}>Bass</a> | <a href={urlLinks(song,'drum')}>Drum</a><hr color='black'/></ul>));
    }
  
  

  return (
        <div className="main">
          <div className={'box'+page}></div>
          <div className = "top">
            <>{/*Component 1 - fixed*/}
              <Router>
                <h1>
                  <Link to="/" onClick={() => handleClick(0)}>Home</Link> | <Link to="/favorites" onClick={() => handleClick(1)}>Favorites</Link> |
                  <Link to="/recommended" onClick={() => handleClick(2)}>Recommended</Link> | <Link to="/history" onClick={() => handleClick(3)}>History</Link>
                </h1>
              </Router>            
            </>
        
            <>{/*Component 2*/}
              <input type="Text" onChange={getSongs} placeholder="Keyword or Artist"/> 
            </>
          </div>
        <div >
          <table className='table'>
            <thead>
              
              <th>{
                setTitle()
                }</th>
              <th><h2>Action</h2></th>
              
            </thead>
            <tbody >
              
                <td className='list'>
                  {/*Component 3*/}
                  {handleList().map((name)=>(
                      <ul>{name.title+'('+name.artist+')'}<hr color='black'/></ul>
                    ))}        
                </td>
                
                <td className='action'>
                  {/*Component 4*/}
                  {
                    getAction()
                  }
                </td>
              
            </tbody>
          </table>
          </div>
          <div className = "history">{/*Component 5*/}
            
            <table>
            <thead><h2>Recently Added</h2></thead>
            <tbody>
              <td>
              {recent.map((name,index)=>(
        <ul><input type='Button' value={"-"} onClick={()=>removeClicked(name)}/>&emsp;{name.title+'('+name.artist+')'}</ul>
      ))}
            </td></tbody>
            </table>
          </div>
        </div>
        );
  }


export default App;
