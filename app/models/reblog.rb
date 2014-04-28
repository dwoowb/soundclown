class Reblog < ActiveRecord::Base

  attr_accessor :type

  has_many :notifications, as: :notifiable, dependent: :destroy
  belongs_to :rebloggable, polymorphic: true, counter_cache: true

  belongs_to(
    :reblogger,
    class_name: "User",
    foreign_key: :reblogger_id,
    primary_key: :id,
    inverse_of: :reblogs
  )

  validates :reblogger, presence: true

  def reblogged_item
    if self.rebloggable_type == "Track"
      return Track.find(self.rebloggable_id)
    elsif self.rebloggable_type == "Playlist"
      return Playlist.find(self.rebloggable_id)
    end
  end

  private

  def set_notification
    case self.rebloggable_type
    when "Track"
      notification = self.notifications.unread.event(:track_got_reblogged).new
    when "Playlist"
      notification = self.notifications.unread.event(:playlist_got_reblogged).new
    end
    notification.user = self.user
    notification.save
  end


end
