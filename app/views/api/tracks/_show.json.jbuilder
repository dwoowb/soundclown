json.(track,
:id, :title, :artist,
:reblogs_count, :likes_count,
:comments_count
)

json.poster do
  json.id track.poster.id
  json.username track.poster.username
end

playlistTracks ||= nil
unless playlistTracks.nil?
  json.playlistTracks do
    json.partial! "api/playlist_tracks/index.json", playlistTracks: playlistTracks
  end
end

comments ||= nil
unless comments.nil?
  json.comments do
    json.partial! "api/comments/index.json", comments: comments
  end
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