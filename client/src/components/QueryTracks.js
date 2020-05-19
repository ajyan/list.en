import React from 'react';

function QueryTracks(props) {
  return (
    <div className="box column" id="trackContainer">
      {props.tracks.map((track, i) => {
        return (
          <div key={i}>
            <br />
            <div
              id={i}
              key={i}
              className="button is-large is-primary is-light playlistButtons"
              onClick={(e) => {
                props.handleQueryTrackChange(e.currentTarget.id);
              }}
            >
              {track.name + ' - ' + track.artists[0].name}
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default QueryTracks;
