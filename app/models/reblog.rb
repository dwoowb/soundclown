class Reblog < ActiveRecord::Base

  has_many :notifications, as: :notifiable, dependent: :destroy
  belongs_to :rebloggable, polymorphic: true

  belongs_to(
    :reblogger,
    class_name: "User",
    foreign_key: :reblogger_id,
    primary_key: :id,
    inverse_of: :reblogs
  )

  validates :reblogger, presence: true

end
