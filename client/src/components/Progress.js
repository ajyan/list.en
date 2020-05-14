import React from 'react';

function Progress(props) {
  return (
    <div className="column is-pulled-left progressBars">
      Acousticness
      <span
        className="icon has-text-info"
        onClick={props.handleModal}
        id="acousticness"
      >
        <i className="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-primary is-medium"
        value={props.audioFeatures.acousticness}
        max="1"
      />
      Danceability
      <span
        className="icon has-text-info"
        onClick={props.handleModal}
        id="danceability"
      >
        <i className="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-link is-medium"
        value={props.audioFeatures.danceability}
        max="1"
      />
      Energy
      <span
        className="icon has-text-info"
        onClick={props.handleModal}
        id="energy"
      >
        <i className="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-danger is-medium"
        value={props.audioFeatures.energy}
        max="1"
      />
      Liveness
      <span
        className="icon has-text-info"
        onClick={props.handleModal}
        id="liveness"
      >
        <i className="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-success is-medium"
        value={props.audioFeatures.liveness}
        max="1"
      />
      Valence
      <span
        className="icon has-text-info"
        onClick={props.handleModal}
        id="valence"
      >
        <i className="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-warning iis-medium"
        value={props.audioFeatures.valence}
        max="1"
      />
      Instrumentalness
      <span
        className="icon has-text-info"
        onClick={props.handleModal}
        id="instrumentalness"
      >
        <i className="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-info is-medium"
        value={props.audioFeatures.instrumentalness}
        max="1"
      />
    </div>
  );
}

export default Progress;
