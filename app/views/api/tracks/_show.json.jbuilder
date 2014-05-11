json.(track,
:id, :title, :artist,
:reblogs_count, :likes_count,
:comments_count
)

json.poster do
  json.id track.poster.id
  json.username track.poster.username
end

comments ||= nil
unless comments.nil?
  json.comments do
    json.partial! "api/comments/index.json", comments: comments
  end
end