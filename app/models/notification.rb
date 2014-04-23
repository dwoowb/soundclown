class Notification < ActiveRecord::Base

  belongs_to :notifiable, polymorphic: true, # dependent: :destroy


end
