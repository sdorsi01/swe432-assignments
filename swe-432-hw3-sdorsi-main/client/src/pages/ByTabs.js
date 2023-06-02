import React, { Component } from 'react';

class ByTabs extends Component {
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
const displayTabs = []
for(let song of bySongs){
  displayTabs.push(<p>{song.name+"("+song.name_id+")"}<nav><a href={song.url_tab}>Guitar</a> | <a href={song.url_tab_bass}>Bass</a> | <a href={song.url_tab_drum}>Drum</a></nav></p>);
}

return (
      <div className="ByTabs">
        {/* Render the cities*/}
         
          <section>
           <h1>Show All Tabs</h1>
            <ul className="byTabs">
              {<p>{displayTabs}</p>}      
            </ul>
          </section>
          </div>
      );    
  }
}


export default ByTabs;
