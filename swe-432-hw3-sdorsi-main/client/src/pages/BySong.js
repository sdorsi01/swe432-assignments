import React, { Component } from 'react';

class BySong extends Component {
  // Initialize state
  state = { 
    bySongs: []       
  }
 
  // Fetch passwords after first mount
  componentDidMount() {
    this.getBySong();
  }

  getBySong() {
    fetch('/bySong')
      .then(res => res.json())
      .then(bySongs => this.setState({ bySongs }));
 }
 

render() {
const { bySongs } = this.state;
const displaySongs = [];
for(let song of bySongs){
  displaySongs.push(<p><strong>{song.name+"("+song.name_id+"):"}</strong>{" ["+song.artist+"("+song.artist_id+")]"}</p>);
}


return (
      <div className="BySong">
        {/* Render the cities*/}
          <section>
          
            <h1>Sorted by Songs</h1>
            <ul className="bySongs">
              {<p>{displaySongs}</p>}      
            </ul>
          </section>

          </div>
      );    
  }
}


export default BySong;
