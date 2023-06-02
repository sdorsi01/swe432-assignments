import React, { Component } from 'react';

class ByArtist extends Component {
  // Initialize state
  state = { 
    byArtist: []       
  }
 
  // Fetch passwords after first mount
  componentDidMount() {
    
    this.getByArtist();
  }

 getByArtist() {
  fetch('/byArtist')
    .then(res => res.json())
    .then(byArtist => this.setState({ byArtist }));
}
 

render() {

const {byArtist} = this.state;
const displayArtists = [];
for(let song of byArtist){
  displayArtists.push(<p>{song.artist+"("+song.artist_id+"): "}<strong>{song.name+"("+song.name_id+") "}</strong></p>);
  }

return (
      <div className="ByArtist">
        {/* Render the cities*/}
          <section>
           <h1>Sorted by Artist</h1>
            <ul className="byArtist">
              {<p>{displayArtists}</p>}      
            </ul>
          </section>

          </div>
      );    
  }
}


export default ByArtist;
