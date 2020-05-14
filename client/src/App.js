import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import buildChart from './components/radarChart.js';
import { features } from './components/Features';
import Progress from './components/Progress';
import Tracklist from './components/Tracklist';
import Player from './components/Player';
import Playlists from './components/Playlists';
import Table from './components/Table';
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
      trackIndex: 0,
      trackId: '',
      audioFeatures: [],
      playlistFeatures: {},
      showModal: false,
      trackDetails: {},
    };
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.handleSongChange = this.handleSongChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
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

  // Retrieves user's playlists and initializes the first song and first playlist
  getUserPlaylists() {
    spotifyApi
      .getUserPlaylists() // note that we don't pass a user id
      .then(({ items }) => {
        this.setState({ playlists: items }, () => {
          if (this.state.playlists[this.state.playlistIndex]) {
            this.setState({
              playlistId: this.state.playlists[this.state.playlistIndex].id,
            });
          }
        });
      })
      .then(() => {
        this.handlePlaylistChange(0);
        this.handleSongChange(0);
      })
      .catch((err) => {
        console.log('Error retrieving playlists', err);
      });
  }

  // Retrieves the list of tracks for a given playlist
  getPlaylistTracks(playlistId) {
    spotifyApi.getPlaylistTracks(playlistId).then(({ items }) => {
      this.setState({ tracks: items });
      this.calculateAverages(items);
    });
  }

  // Retrieves audio features for a specific track
  getAudioFeatures(trackId) {
    spotifyApi.getAudioFeaturesForTrack(trackId).then((res) => {
      this.setState({ audioFeatures: res }, () => {
        buildChart(
          this.state.audioFeatures,
          this.state.tracks[this.state.trackIndex].track.name,
          this.state.playlistFeatures,
          this.state.playlists[this.state.playlistIndex].name
        );
      });
    });
  }

  // returns the audio features of a track
  getTrackDetails(trackId) {
    spotifyApi.getTrack(trackId).then((res) => {
      this.setState({ trackDetails: res });
    });
  }

  // calculates the audio feature averages of the tracks provided
  calculateAverages(items) {
    let playlistFeatures = {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      valence: 0,
      instrumentalness: 0,
      liveness: 0,
    };
    let ids = [];

    for (let item of items) {
      ids.push(item.track.id);
    }

    spotifyApi
      .getAudioFeaturesForTracks(ids)
      .then(({ audio_features }) => {
        for (let feature of audio_features) {
          if (feature !== null) {
            playlistFeatures.acousticness += feature.acousticness;
            playlistFeatures.danceability += feature.danceability;
            playlistFeatures.energy += feature.energy;
            playlistFeatures.valence += feature.valence;
            playlistFeatures.liveness += feature.liveness;
            playlistFeatures.instrumentalness = feature.instrumentalness;
          }
        }
        for (let feature in playlistFeatures) {
          playlistFeatures[feature] /= ids.length;
          playlistFeatures[feature] = playlistFeatures[feature].toFixed(4);
        }
      })
      .then(() => {
        this.setState({ playlistFeatures: playlistFeatures });
      });
  }

  handlePlaylistChange(playlistIndex) {
    this.setState({ playlistIndex: playlistIndex });
    this.setState(
      { playlistId: this.state.playlists[playlistIndex].id },
      () => {
        this.getPlaylistTracks(this.state.playlistId);
      }
    );
  }

  handleSongChange(trackIndex) {
    this.setState({ trackIndex: trackIndex });
    this.setState({ trackId: this.state.tracks[trackIndex].track.id }, () => {
      this.getAudioFeatures(this.state.trackId);
      this.getTrackDetails(this.state.trackId);
    });
  }

  handleModal(e) {
    let feature = e.currentTarget.id;
    this.setState({ showModal: true });
    this.setState({ featureDefinition: features[feature] });
  }

  componentDidMount() {
    this.getUserPlaylists();
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <a className="button is-large" href="http://3.22.175.136">
            Login to Spotfiy
          </a>
        )}
        {this.state.loggedIn && (
          <div>
            <section className="hero is-primary is-bold">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Audoo</h1>
                </div>
              </div>
            </section>
            <br />
            {this.state.showModal && (
              <div className="notification">
                <button
                  className="delete"
                  onClick={() => {
                    this.setState({ showModal: false });
                  }}
                ></button>
                {this.state.featureDefinition}
              </div>
            )}
            <div className="columns is-2">
              <div className="column">
                {this.state.trackDetails.album &&
                  this.state.audioFeatures.tempo && (
                    <Table
                      trackDetails={this.state.trackDetails}
                      audioFeatures={this.state.audioFeatures}
                    />
                  )}
              </div>
              <div className="column" id="chartContainer">
                <canvas id="radarChart" />
              </div>
              <Progress
                audioFeatures={this.state.audioFeatures}
                handleModal={this.handleModal}
              />
            </div>
            <div className="columns is-2">
              <Playlists
                playlists={this.state.playlists}
                handlePlaylistChange={this.handlePlaylistChange}
              />
              <Tracklist
                tracks={this.state.tracks}
                handleSongChange={this.handleSongChange}
              />
              <Player playlistId={this.state.playlistId} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
