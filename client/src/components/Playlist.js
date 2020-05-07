import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function Playlist(props) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlistId, setPlaylistId] = useState('');

  let getUserPlaylists = () => {
    spotifyApi
      .getUserPlaylists() // note that we don't pass a user id
      .then(({ items }) => {
        setPlaylists(items);
        setPlaylistId(playlists[playlistIndex].id);
      })
      .catch((err) => {
        console.log('Error retrieving playlists', err);
      });
  };

  let handlePlaylistChange = (e) => {
    let playlistIndex = e.currentTarget.id;
    setPlaylistIndex(playlistIndex);
    setPlaylistId(playlists[playlistIndex].id);
    getUserPlaylists();
  };

  return (
    <div className="column" id="playlistContainer">
      {playlists &&
        props.playlists.map((playlist, i) => {
          return (
            <div
              id={i}
              value={i}
              className="box playlistButtons"
              onClick={handlePlaylistChange}
            >
              {playlist.name}
            </div>
          );
        })}
    </div>
  );
}

export default Playlist;
