json.array!(tracks) do |track|
  json.partial! "api/tracks/show.json", track: track
end


