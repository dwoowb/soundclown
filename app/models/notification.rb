class Notification < ActiveRecord::Base

  belongs_to :notifiable, polymorphic: true # dependent: :destroy

  belongs_to :user

  validates :user, presence: true

  def text

  end

  def url

  end

end
