json.(user,
:id, :email,
:fname, :lname,
:username, :city,
:tracks_count, :playlists_count, :likes_count, :comments_count, :notifications_count
)

json.followers_count user.followers.size
json.followees_count user.followees.size

json.tracks do
  json.partial! "api/tracks/index.json", tracks: user.tracks
end

json.playlists do
  json.partial! "api/playlists/index.json", playlists: user.playlists
end

json.likes do
  json.partial! "api/likes/index.json", likes: user.likes
end

json.reblogs do
  json.partial! "api/reblogs/index.json", reblogs: user.reblogs
end

json.comments do
  json.partial! "api/comments/index.json", comments: user.authored_comments
end

json.followers do
  json.array!(user.followers) do |follower|
    json.(follower,
    :id, :username
    )

    json.followers_count follower.followers.size
  end
end

json.followees do
  json.array!(user.followees) do |followee|
    json.(followee,
    :id, :username
    )
    json.followers_count followee.followers.size
  end
end

json.notifications do
  json.partial! "api/notifications/index.json", notifications: user.notifications
end













