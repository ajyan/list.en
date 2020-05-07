import React from 'react';

function Progress(props) {
  return (
    <div className="column is-pulled-left progressBars">
      <a href="/#" onClick={props.handleModal} id="acousticness">
        Acousticness
      </a>
      <progress
        className="progress is-primary is-medium"
        value={props.audioFeatures.acousticness}
        max="1"
      />
      <a href="/#" onClick={props.handleModal} id="danceability">
        Danceability
      </a>
      <progress
        className="progress is-link is-medium"
        value={props.audioFeatures.danceability}
        max="1"
      />
      <a href="/#" onClick={props.handleModal} id="energy">
        Energy
      </a>
      <progress
        className="progress is-danger is-medium"
        value={props.audioFeatures.energy}
        max="1"
      />
      <a href="/#" onClick={props.handleModal} id="liveness">
        Liveness
      </a>
      <progress
        className="progress is-success is-medium"
        value={props.audioFeatures.liveness}
        max="1"
      />
      <a href="/#" onClick={props.handleModal} id="valence">
        Valence
      </a>
      <progress
        className="progress is-warning iis-medium"
        value={props.audioFeatures.valence}
        max="1"
      />
      <a href="/#" onClick={props.handleModal} id="instrumentalness">
        Instrumentalness
      </a>
      <progress
        className="progress is-info is-medium"
        value={props.audioFeatures.instrumentalness}
        max="1"
      />
    </div>
  );
}

export default Progress;
