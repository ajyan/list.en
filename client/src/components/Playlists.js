import React from 'react';

function Playlists(props) {
  return (
    <div className="box is-primary column" id="playlistContainer">
      {props.playlists &&
        props.playlists.map((playlist, i) => {
          return (
            <div key={i}>
              <br />
              <div
                id={i}
                className="button is-large is-primary playlistButtons"
                onClick={props.handlePlaylistChange}
              >
                {playlist.name}
              </div>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default Playlists;
