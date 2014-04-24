class Playlist < ActiveRecord::Base

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :playlist_id,
    primary_key: :id
  )

  has_many :tracks, through: :playlist_tracks, source: :track


  validates :title, presence: true


end
