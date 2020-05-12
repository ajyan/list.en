import React from 'react';

function Progress(props) {
  return (
    <div className="column is-pulled-left progressBars">
      Acousticness
      <span
        class="icon has-text-info"
        onClick={props.handleModal}
        id="acousticness"
      >
        <i class="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-primary is-medium"
        value={props.audioFeatures.acousticness}
        max="1"
      />
      Danceability
      <span
        class="icon has-text-info"
        onClick={props.handleModal}
        id="danceability"
      >
        <i class="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-link is-medium"
        value={props.audioFeatures.danceability}
        max="1"
      />
      Energy
      <span class="icon has-text-info" onClick={props.handleModal} id="energy">
        <i class="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-danger is-medium"
        value={props.audioFeatures.energy}
        max="1"
      />
      Liveness
      <span
        class="icon has-text-info"
        onClick={props.handleModal}
        id="liveness"
      >
        <i class="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-success is-medium"
        value={props.audioFeatures.liveness}
        max="1"
      />
      Valence
      <span class="icon has-text-info" onClick={props.handleModal} id="valence">
        <i class="fas fa-info-circle"></i>
      </span>
      <progress
        className="progress is-warning iis-medium"
        value={props.audioFeatures.valence}
        max="1"
      />
      Instrumentalness
      <span
        class="icon has-text-info"
        onClick={props.handleModal}
        id="instrumentalness"
      >
        <i class="fas fa-info-circle"></i>
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
