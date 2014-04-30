class Comment < ActiveRecord::Base

  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy

  belongs_to(
    :commenter,
    class_name: "User",
    foreign_key: :commenter_id,
    primary_key: :id,
    inverse_of: :authored_comments,
    counter_cache: true
  )

  belongs_to(
    :track,
    class_name: "Track",
    foreign_key: :track_id,
    primary_key: :id,
    inverse_of: :comments,
    counter_cache: true
  )

  after_create :set_notification

  validates :body, :commenter, presence: true

  def set_notification
    notification = self.notifications.unread.event(:track_got_commented).new
    notification.user = self.track.poster
    notification.save!
  end

end
