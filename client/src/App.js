import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
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
      console.log(res);
      this.setState({ audioFeatures: res });
    });
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
        <a href="http://localhost:8888"> Login to Spotify </a>

        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="title">Playlists</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="title">Tracks</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="title">Charts</p>
            </div>
          </div>
        </nav>
        <div className="columns">
          <div className="column" id="playlistContainer">
            {this.state.playlists &&
              this.state.playlists.map((playlist, i) => {
                return (
                  <div
                    id={i}
                    value={i}
                    className="box playlistButtons"
                    onClick={this.handlePlaylistChange}
                  >
                    {playlist.name}
                  </div>
                );
              })}
          </div>
          <div className="column" id="trackContainer">
            {this.state.tracks.map(({ track }, i) => {
              return (
                <div
                  id={i}
                  value={i}
                  className="box playlistButtons"
                  onClick={this.handleSongChange}
                >
                  {track.name}
                </div>
              );
            })}
          </div>
          <div className="column">
            <progress
              class="progress is-primary"
              value={this.state.audioFeatures.acousticness}
              max="1"
            >
              15%
            </progress>
            <progress
              class="progress is-link"
              value={this.state.audioFeatures.danceability}
              max="1"
            >
              30%
            </progress>
            <progress
              class="progress is-danger"
              value={this.state.audioFeatures.energy}
              max="1"
            >
              45%
            </progress>
            <progress
              class="progress is-success"
              value={this.state.audioFeatures.liveness}
              max="1"
            >
              60%
            </progress>
            <progress
              class="progress is-warning"
              value={this.state.audioFeatures.valence}
              max="1"
            >
              75%
            </progress>
            <progress
              class="progress is-info"
              value={this.state.audioFeatures.instrumentalness}
              max="1"
            >
              90%
            </progress>
          </div>
        </div>
        <div className="columns">
          <div className="column"></div>
          <div className="column">
            {this.state.playlistId && (
              <iframe
                src={`https://open.spotify.com/embed/playlist/${this.state.playlistId}`}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            )}
          </div>
          <div className="column"></div>
        </div>
      </div>
    );
  }
}

export default App;
