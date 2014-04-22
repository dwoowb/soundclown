class Comment < ActiveRecord::Base

  belongs_to :commentable, polymorphic: true# , dependent: :destroy

  belongs_to(
    :commenter,
    class_name: "User",
    foreign_key: :commenter_id,
    primary_key: :id,
    inverse_of: :authored_comments
  )

  validates :body, :commenter, presence: true
end
