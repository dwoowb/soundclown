class Track < ActiveRecord::Base

  belongs_to(
    :poster,
    class_name: "User",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :tracks
  )

  validates :title, :artist, :poster, presence: true

end
