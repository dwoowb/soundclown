json.array!(users) do |user|
  json.partial! "api/users/show.json", user: user
end

