json.array!(comments) do |comment|
  json.partial! "api/comments/show.json", comment: comment
end