class Comment < ActiveRecord::Base

  belongs_to :commentable, polymorphic: true# , dependent: :destroy

  belongs_to(
    :commenter,
    class_name: "User",
    foreign_key: :commenter_id,
    primary_key: :id
  )

  validates :body, :commenter_id, presence: true
end
