class Like < ActiveRecord::Base

  has_many :notifications, as: :notifiable, dependent: :destroy
  belongs_to :likeable, polymorphic: true, counter_cache: true

  belongs_to(
    :liker,
    class_name: "User",
    foreign_key: :liker_id,
    primary_key: :id,
    inverse_of: :likes,
    counter_cache: true
  )

  after_commit :set_notification, on: [:create]

  validates :liker, :likeable, presence: true

  private

  def set_notification
    case self.likeable_type
    when "Track"
      notification = self.notifications.unread.event(:track_got_liked).new
    when "Playlist"
      notification = self.notifications.unread.event(:playlist_got_liked).new
    end
    notification.user = self.user
    notification.save
  end

end
