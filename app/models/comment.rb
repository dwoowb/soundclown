class Comment < ActiveRecord::Base

  belongs_to :commentable, polymorphic: true

  has_many :notifications, as: :notifiable, dependent: :destroy

  belongs_to(
    :commenter,
    class_name: "User",
    foreign_key: :commenter_id,
    primary_key: :id,
    inverse_of: :authored_comments
  )

  belongs_to(
    :track,
    class_name: "Track",
    foreign_key: :track_id,
    primary_key: :id,
    inverse_of: :comments
  )

  validates :body, :commenter, presence: true
end
