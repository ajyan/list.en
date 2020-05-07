import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import buildChart from './radarChart.js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      playlists: [],
      playlistIndex: 0,
      playlistId: '',
      tracks: [],
      trackIndex: '',
      trackId: '',
      audioFeatures: [],
    };
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.handleSongChange = this.handleSongChange.bind(this);
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getUserPlaylists() {
    spotifyApi
      .getUserPlaylists() // note that we don't pass a user id
      .then(({ items }) => {
        this.setState({ playlists: items }, () => {
          this.setState({
            playlistId: this.state.playlists[this.state.playlistIndex].id,
          });
        });
      })
      .catch((err) => {
        console.log('Error retrieving playlists', err);
      });
  }

  getPlaylistTracks(id) {
    spotifyApi.getPlaylistTracks(id).then(({ items }) => {
      this.setState({ tracks: items });
    });
  }

  getAudioFeatures(trackId) {
    spotifyApi.getAudioFeaturesForTrack(trackId).then((res) => {
      this.setState({ audioFeatures: res }, () => {
        buildChart(
          this.state.audioFeatures,
          this.state.tracks[this.state.trackIndex].track.name
        );
      });
    });
  }

  handlePlaylistChange(e) {
    let playlistIndex = e.currentTarget.id;
    this.setState({ playlistIndex: playlistIndex });
    this.setState(
      { playlistId: this.state.playlists[playlistIndex].id },
      () => {
        this.getPlaylistTracks(this.state.playlistId);
      }
    );
  }

  handleSongChange(e) {
    let trackIndex = e.currentTarget.id;
    this.setState({ trackIndex: trackIndex });
    this.setState({ trackId: this.state.tracks[trackIndex].track.id }, () => {
      this.getAudioFeatures(this.state.trackId);
    });
  }

  componentDidMount() {
    this.getUserPlaylists();
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <a href="http://localhost:8888"> Login to Spotify </a>
        )}
        <section class="hero is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Audoo</h1>
            </div>
          </div>
        </section>
        <br />
        <div className="columns">
          <div className="column"></div>
          <div className="column" id="chartContainer">
            <canvas id="radarChart" />
          </div>
          <div className="column is-hcentered progressBars">
            <progress
              className="progress is-primary"
              value={this.state.audioFeatures.acousticness}
              max="1"
            />
            <progress
              className="progress is-link"
              value={this.state.audioFeatures.danceability}
              max="1"
            />

            <progress
              className="progress is-danger"
              value={this.state.audioFeatures.energy}
              max="1"
            />
            <progress
              className="progress is-success"
              value={this.state.audioFeatures.liveness}
              max="1"
            />
            <progress
              className="progress is-warning"
              value={this.state.audioFeatures.valence}
              max="1"
            />

            <progress
              className="progress is-info"
              value={this.state.audioFeatures.instrumentalness}
              max="1"
            />
          </div>
        </div>
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="title">Playlists</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="title">Tracks</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="title">Player</p>
            </div>
          </div>
        </nav>
        <div className="columns">
          <div className="column" id="playlistContainer">
            {this.state.playlists &&
              this.state.playlists.map((playlist, i) => {
                return (
                  <div>
                    <br />
                    <div
                      id={i}
                      key={i}
                      className="button is-large is-primary playlistButtons"
                      onClick={this.handlePlaylistChange}
                    >
                      {playlist.name}
                    </div>
                    <br />
                  </div>
                );
              })}
          </div>
          <div className="column" id="trackContainer">
            {this.state.tracks.map(({ track }, i) => {
              return (
                <div>
                  <br />
                  <div
                    id={i}
                    key={i}
                    className="button is-large is-primary is-light playlistButtons"
                    onClick={this.handleSongChange}
                  >
                    {track.name}
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
          <div className="column">
            {this.state.playlistId && (
              <iframe
                title="spotifyPlayer"
                src={`https://open.spotify.com/embed/playlist/${this.state.playlistId}`}
                width="100%"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
