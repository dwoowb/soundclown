class Reblog < ActiveRecord::Base

  has_many :notifications, as: :notifiable, dependent: :destroy

  belongs_to(
    :reblogger,
    class_name: "User",
    foreign_key: :reblogger_id,
    primary_key: :id,
    inverse_of: :reblogs
  )

  belongs_to(
    :track,
    class_name: "Track",
    foreign_key: :track_id,
    primary_key: :id,
    inverse_of: :reblogs
  )

  validates :reblogger, :track, presence: true

end
