class Playlist < ActiveRecord::Base

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :playlist_id,
    primary_key: :id
  )

  has_many :tracks, through: :playlist_tracks, source: :track
  has_many :reblogs, as: :rebloggable
  has_many :likes, as: :likeable

  belongs_to :creator

  validates :title, presence: true


end
