import React from 'react';

function Tracklist(props) {
  return (
    <div className="box column" id="trackContainer">
      {props.tracks.map(({ track }, i) => {
        return (
          <div key={i}>
            <br />
            <div
              id={i}
              key={i}
              className="button is-large is-primary is-light playlistButtons"
              onClick={props.handleSongChange}
            >
              {track.name}
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Tracklist;
