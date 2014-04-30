class Notification < ActiveRecord::Base

  include Rails.application.routes.url_helpers

  EVENT_IDS = EVENTS.invert

  belongs_to :user, inverse_of: :notifications, counter_cache: true
  belongs_to :notifiable, inverse_of: :notifications, polymorphic: true, counter_cache: true

  validates :event_id, inclusion: { in: EVENTS.keys }
  validates :is_read, inclusion: { in: [true, false] }
  validates :user, :notifiable, presence: true

  scope :read, -> { where(is_read: true) }
  scope :unread, -> { where(is_read: false) }
  scope :event, ->(event_name) { where(event_id: EVENT_IDS[event_name]) }
  # definitely go back and review how scopes work

  def default_url_options
    options = {}
    options[:host] = Rails.env.development? ? "localhost:3000" : "http://soundclown.herokuapp.com"
    options
  end

  def event_name
    EVENTS[self.event_id]
  end

  def text
    case self.event_name
    when :gained_a_new_follower
      follow = self.notifiable
      follower = follow.follower
      "#{follower.username} followed you"
    when :track_got_liked, :playlist_got_liked
      like = self.notifiable
      liked_item = like.likeable
      liker = like.liker
      "#{liker.username} liked #{liked_item.title}"
    when :track_got_commented
      comment = self.notifiable
      commented_track = comment.track
      commenter = comment.commenter
      "#{commenter.username} commented on #{commented_track.title}"
    when :track_got_reblogged, :playlist_got_reblogged
      reblog = self.notifiable
      reblogged_item = reblog.rebloggable
      reblogger = reblog.reblogger
      "#{reblogger.username} reblogged #{reblogged_item.title}"
    end
  end

  def url
    case self.event_name
    when :gained_a_new_follower
      follow = self.notifiable
      follower = follow.follower
      user_url(follower)
    when :track_got_liked, :playlist_got_liked
      like = self.notifiable
      liker = like.liker
      user_url(liker)
    when :track_got_commented
      comment = self.notifiable
      commented_track = comment.track
      track_url(commented_track)
    when :track_got_reblogged, :playlist_got_reblogged
      reblog = self.notifiable
      reblogger = reblog.reblogger
      user_url(reblogger)
    end
  end

end
