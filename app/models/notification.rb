class Notification < ActiveRecord::Base

  belongs_to :notifiable, polymorphic: true
  belongs_to :user

  validates :user, presence: true

  include Rails.application.routes.url_helpers

  def default_url_options
    if Rails.env.development?
      { host: "localhost:3000" }
    else
      { host: "http://soundclown.herokuapp.com" }
    end
  end

  def text
    if self.notifiable_type == "Reblog"
      reblog = Reblog.find(self.notifiable_id)
      reblogged_item = reblog.rebloggable_type.constantize.find(reblog.rebloggable_id)
      notifier = User.find(reblog.reblogger_id)
      return "#{notifier.username} " + NOTIFICATION_EVENTS[self.event_id] + " #{reblogged_item.title}"
    elsif self.notifiable_type == "Comment"
      comment = Comment.find(self.notifiable_id)
      commented_track = Track.find(comment.track_id)
      notifier = User.find(comment.commenter)
      return "#{notifier.username} " + NOTIFICATION_EVENTS[self.event_id] + " #{commented_track.title}"
    elsif self.notifiable_type == "Follow"
      follow = Follow.find(self.notifiable_id)
      notifier = User.find(follow.follower)
      return "#{notifier.username} " + NOTIFICATION_EVENTS[self.event_id]
    end
  end

  def url
    if self.notifiable_type == "Reblog"
      reblog = Reblog.find(self.notifiable_id)
      reblogged_item = reblog.rebloggable_type.constantize.find(reblog.rebloggable_id)

      if reblogged_item.rebloggable_type == "Track"
        @url = track_url(reblogged_item)
      else
        @url = playlist_url(reblogged_item)
      end
    elsif self.notifiable_type == "Comment"
      comment = Comment.find(self.notifiable_id)
      commented_track = Track.find(comment.track_id)
      @url = track_url(commented_track)
    elsif self.notifiable_type == "Follow"
      follow = Follow.find(self.notifiable_id)
      follower = User.find(follow.follower_id)
      @url = user_url(follower)
    end
  end

end
