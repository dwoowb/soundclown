class Playlist < ActiveRecord::Base

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :playlist_id,
    primary_key: :id,
    inverse_of: :playlist
  )

  has_many :tracks, through: :playlist_tracks, source: :track
  has_many :reblogs, as: :rebloggable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

  has_many :rebloggers, through: :reblogs, source: :tracks
  has_many :likers, through: :likes, source: :likes


  belongs_to(
    :creator,
    class_name: "User",
    foreign_key: :creator_id,
    primary_key: :id,
    inverse_of: :playlists
  )

  validates :title, :creator_id, presence: true


end
