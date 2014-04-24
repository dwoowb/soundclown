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

  has_many :rebloggers, through: :reblogs, source: :tracks

  belongs_to(
    :poster,
    class_name: "User",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :tracks
  )

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :track_id,
    primary_key: :id
  )

  has_many :playlists, through: :playlist_tracks, source: :playlist


  validates :title, :artist, :poster, presence: true

end
