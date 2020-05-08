import React from 'react';

function Player(props) {
  return (
    <div className="box column">
      {props.playlistId && (
        <iframe
          title="spotifyPlayer"
          src={`https://open.spotify.com/embed/playlist/${props.playlistId}`}
          width="100%"
          height="350vh"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
}

export default Player;
