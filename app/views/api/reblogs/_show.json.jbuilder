json.(reblog,
:id, :reblogger_id,
:rebloggable_id, :rebloggable_type,
:notifications_count
)

reblogged_item = reblog.rebloggable

if reblog.rebloggable_type == "Track"
  json.reblogged_track do
    json.id reblogged_item.id
    json.title reblogged_item.title
    json.artist reblogged_item.artist
    json.poster do
      json.id reblogged_item.poster.id
      json.username reblogged_item.poster.username
    end
  end
elsif reblog.rebloggable_type == "Playlist"
  json.reblogged_playlist do
    json.id reblogged_item.id
    json.title reblogged_item.title
    json.creator do
      json.id reblogged_item.creator.id
      json.username reblogged_item.creator.username
    end
    json.tracks do
      json.array!(reblogged_item.tracks) do |track|
        json.id track.id
        json.title track.title
        json.artist track.artist
        json.poster do
          json.id track.poster.id
          json.username track.poster.username
        end
      end
    end
  end
end
