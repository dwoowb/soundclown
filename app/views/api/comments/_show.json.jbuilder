json.(comment,
:id, :body, :track,
:notifications_count
)

json.commenter do
  json.id comment.commenter.id
  json.username comment.commenter.username
end
