import React from 'react';

function Progress(props) {
  return (
    <div className="column is-pulled-left progressBars">
      Acousticness
      <progress
        className="progress is-primary is-medium"
        value={props.audioFeatures.acousticness}
        max="1"
      />
      Danceability
      <progress
        className="progress is-link is-medium"
        value={props.audioFeatures.danceability}
        max="1"
      />
      Energy
      <progress
        className="progress is-danger is-medium"
        value={props.audioFeatures.energy}
        max="1"
      />
      Liveness
      <progress
        className="progress is-success is-medium"
        value={props.audioFeatures.liveness}
        max="1"
      />
      Valence
      <progress
        className="progress is-warning iis-medium"
        value={props.audioFeatures.valence}
        max="1"
      />
      Instrumentalness
      <progress
        className="progress is-info is-medium"
        value={props.audioFeatures.instrumentalness}
        max="1"
      />
    </div>
  );
}

export default Progress;
