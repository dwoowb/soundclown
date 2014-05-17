json.(playlist,
:id, :title, :creator,
:reblogs_count, :likes_count
)

playlistTracks ||= nil
unless playlistTracks.nil?
  json.playlistTracks do
    json.partial! "api/playlist_tracks/index.json", playlistTracks: playlistTracks
  end
end


json.tracks do
  json.partial! "api/tracks/index.json", tracks: playlist.tracks
end


likes ||= nil
unless likes.nil?
  json.likes do
    json.partial! "api/likes/index.json", likes: likes
  end
end

reblogs ||= nil
unless reblogs.nil?
  json.reblogs do
    json.partial! "api/reblogs/index.json", reblogs: reblogs
  end
end