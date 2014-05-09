json.(track,
:id, :title, :artist,
:poster,
:reblogs_count, :likes_count,
:comments_count
)

comments ||= nil
unless comments.nil?
  json.comments do
    json.partial! "api/comments/index.json", comments: comments
  end
end