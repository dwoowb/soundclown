class Track < ActiveRecord::Base

  has_many :comments, as: :commentable

  has_many(
    :reblogs,
    class_name: "Reblog",
    foreign_key: :track_id,
    primary_key: :id,
    inverse_of: :track,
    dependent: :destroy
  )

  belongs_to(
    :poster,
    class_name: "User",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :tracks
  )

  validates :title, :artist, :poster, presence: true

end
