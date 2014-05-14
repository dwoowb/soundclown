json.array!(playlists) do |playlist|
  json.partial! "api/playlists/show.json", playlist: playlist, likes: playlist.likes, reblogs: playlist.reblogs
end