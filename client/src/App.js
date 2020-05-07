import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import buildChart from './radarChart.js';
import Progress from './components/Progress';
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
      playlistFeatures: {},
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
      this.calculateAverages(items);
    });
  }

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
          playlistFeatures.acousticness += feature.acousticness;
          playlistFeatures.danceability += feature.danceability;
          playlistFeatures.energy += feature.energy;
          playlistFeatures.valence += feature.valence;
          playlistFeatures.liveness += feature.liveness;
          playlistFeatures.instrumentalness = feature.instrumentalness;
        }
        for (let feature in playlistFeatures) {
          playlistFeatures[feature] /= ids.length;
        }
      })
      .then(() => {
        this.setState({ playlistFeatures: playlistFeatures });
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
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Audoo</h1>
            </div>
          </div>
        </section>
        <br />
        <div className="columns">
          <div className="column"></div>
          <div className="column" id="chartContainer">
            <canvas id="radarChart" />
          </div>
          <Progress audioFeatures={this.state.audioFeatures} />
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
