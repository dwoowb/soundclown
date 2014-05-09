json.array!(likes) do |like|
  json.partial! "api/likes/show.json", like: like
end