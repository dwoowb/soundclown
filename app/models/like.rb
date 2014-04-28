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
    # YOU NEED TO ADJUST THIS
    notification = self.notifications.unread.event(:gained_a_new_follower).new
    notification.user = self.user
    notification.save
  end

end
