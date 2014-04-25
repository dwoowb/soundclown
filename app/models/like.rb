class Like < ActiveRecord::Base
  
  has_many :notifications, as: :notifiable, dependent: :destroy
  belongs_to :likeable, polymorphic: true 
  belongs_to(
    :liker,
    class_name: "User",
    foreign_key: :liker_id,
    primary_key: :id,
    inverse_of: :like
  )
  
  validates :liker, presence: true
end
