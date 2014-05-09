class Playlist < ActiveRecord::Base

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :playlist_id,
    primary_key: :id,
    inverse_of: :playlist
  )

  has_many :tracks, through: :playlist_tracks, source: :track
  has_many :reblogs, as: :rebloggable, inverse_of: :rebloggable, dependent: :destroy
  has_many :likes, as: :likeable, inverse_of: :likeable, dependent: :destroy

  has_many :rebloggers, through: :reblogs, source: :tracks
  has_many :likers, through: :likes, source: :likes


  belongs_to(
    :creator,
    class_name: "User",
    foreign_key: :creator_id,
    primary_key: :id,
    inverse_of: :playlists,
    counter_cache: true
  )

  validates :title, :creator_id, presence: true


end
