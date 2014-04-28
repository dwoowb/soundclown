class Follow < ActiveRecord::Base

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id,
    counter_cache: true
  )

  belongs_to(
    :followee,
    class_name: "User",
    foreign_key: :followee_id,
    primary_key: :id,
    counter_cache: true
  )

  after_commit :set_notification, on: [:create]

  validates :followee, :follower, presence: true

  private

  def set_notification
    notification = self.notifications.unread.event(:gained_a_new_follower).new
    notification.user = self.user
    notification.save
  end
end
