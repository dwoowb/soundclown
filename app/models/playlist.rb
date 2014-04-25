class Playlist < ActiveRecord::Base

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :playlist_id,
    primary_key: :id
  )

  has_many :tracks, through: :playlist_tracks, source: :track
  has_many :reblogs, as: :rebloggable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

  belongs_to(
    :creator,
    class_name: "User",
    foreign_key: :creator_id,
    primary_key: :id
  )

  validates :title, :creator_id, presence: true


end
