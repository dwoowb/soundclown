json.(playlist,
:id, :title, :creator,
:reblogs_count, :likes_count
)

json.tracks do
  json.array!(playlist.tracks) do |track|
    json.id track.id
    json.title track.title
    json.artist track.artist
    json.poster do
      json.id track.poster.id
      json.username track.poster.username
    end
  end
end