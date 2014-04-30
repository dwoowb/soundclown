class Follow < ActiveRecord::Base

  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id,
    inverse_of: :in_follows
    # counter_cache: true
  )

  belongs_to(
    :followee,
    class_name: "User",
    foreign_key: :followee_id,
    primary_key: :id,
    inverse_of: :out_follows
    # counter_cache: true
  )

  after_create :set_notification

  validates :followee, :follower, presence: true

  private

  def set_notification
    notification = self.notifications.unread.event(:gained_a_new_follower).new
    notification.user = self.followee
    notification.save!
  end
end
