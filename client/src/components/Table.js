import React from 'react';
import { key } from './Key';

let stringifyArtists = (trackArtists) => {
  let names = trackArtists
    .map(({ name }) => {
      return name;
    })
    .join(', ');
  return names;
};

function Table(props) {
  let songKey = props.audioFeatures.key;
  let artists = stringifyArtists(props.trackDetails.artists);
  let tempo = props.audioFeatures.tempo.toFixed(0);
  return (
    <div className="table-container">
      <table className="table is-fullwidth is-hoverable is-bordered is-striped">
        <thead>
          <tr>
            <th>Detail</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Name</th>
            <th>{props.trackDetails.name}</th>
          </tr>
          <tr>
            <th>Album</th>
            <th>{props.trackDetails.album.name}</th>
          </tr>
          <tr>
            <th>Artist(s)</th>
            <th>{artists}</th>
          </tr>
          <tr>
            <th>Popularity</th>
            <th>{props.trackDetails.popularity}</th>
          </tr>
          <tr>
            <th>Key</th>
            <th>{key[songKey]}</th>
          </tr>
          <tr>
            <th>BPM</th>
            <th>{tempo}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
