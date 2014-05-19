json.array!(follows) do |follow|
  json.partial! "api/follows/show.json", follow: follow
end