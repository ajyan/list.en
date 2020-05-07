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
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      playlists: [],
      playlistIndex: 0,
    };
  }

  getUserPlaylists() {
    spotifyApi
      .getUserPlaylists() // note that we don't pass a user id
      .then(({ items }) => {
        this.setState({ playlists: items });
        console.log('User playlists', items);
      })
      .catch((err) => {
        console.log('Error retrieving playlists', err);
      });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log('this', response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
        },
      });
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
  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} />
        </div>
        {this.state.loggedIn && (
          <button
            onClick={() => {
              // this.getNowPlaying();
              this.getUserPlaylists();
            }}
          >
            Check now playing
          </button>
        )}
        {this.state.playlists.map((playlist, i) => {
          return (
            <div id={i} value={i}>
              {playlist.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
