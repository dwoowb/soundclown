json.array!(playlists) do |playlist|
  json.partial! "api/playlists/show.json", playlist: playlist
end