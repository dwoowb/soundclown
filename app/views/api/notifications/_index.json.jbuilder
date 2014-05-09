json.array!(notifications) do |notification|
  json.(notification,
  :id, :user, :event_id,
  :notifiable_id, :notifiable_type,
  :is_read
  )

  notified_item = notification.notifiable

  if notification.notifiable_type == "Comment"
    json.partial! "api/comments/show.json", comment: notified_item
  elsif notification.notifiable_type == "Like"
    json.partial! "api/likes/show.json", like: notified_item
  elsif notification.notifiable_type == "Reblog"
    json.partial! "api/reblogs/show.json", reblog: notified_item
  elsif notification.notifiable_type == "Follow"
      follower = notified_item.follower

      json.(follower,
        :id, :username, :followers
      )
  end
end