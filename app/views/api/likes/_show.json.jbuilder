json.(like,
:id, :liker_id,
:likeable_id, :likeable_type,
:notifications_count
)

liked_item = like.likeable

if like.likeable_type == "Track"
  json.liked_track do
    json.id liked_item.id
    json.title liked_item.title
    json.artist liked_item.artist
    json.likes_count liked_item.likes_count
    json.reblogs_count liked_item.reblogs_count
    json.comments_count liked_item.comments_count
    json.poster do
      json.id liked_item.poster.id
      json.username liked_item.poster.username
    end
  end
elsif like.likeable_type == "Playlist"
  json.liked_playlist do
    json.id liked_item.id
    json.title liked_item.title
    json.likes_count liked_item.likes_count
    json.reblogs_count liked_item.reblogs_count
    json.creator do
      json.id liked_item.creator.id
      json.username liked_item.creator.username
    end
    json.tracks do
      json.array!(liked_item.tracks) do |track|
        json.id track.id
        json.title track.title
        json.artist track.artist
        json.likes_count liked_item.likes_count
        json.reblogs_count liked_item.reblogs_count
        json.comments_count liked_item.comments_count
        json.poster do
          json.id track.poster.id
          json.username track.poster.username
        end
      end
    end
  end
end
