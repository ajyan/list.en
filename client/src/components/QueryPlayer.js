import React from 'react';

function QueryPlayer(props) {
  return (
    <div className="box column">
      {props.trackId && (
        <iframe
          title="spotifyPlayer"
          src={`https://open.spotify.com/embed/track/${props.trackId}`}
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

export default QueryPlayer;
