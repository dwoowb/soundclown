class Track < ActiveRecord::Base

  has_many :comments

  has_many(
    :playlist_tracks,
    class_name: "PlaylistTrack",
    foreign_key: :track_id,
    primary_key: :id,
    inverse_of: :track
  )

  has_many :playlists, through: :playlist_tracks, source: :playlist
  has_many :reblogs, as: :rebloggable, inverse_of: :rebloggable, dependent: :destroy
  has_many :likes, as: :likeable, inverse_of: :likeable, dependent: :destroy

  has_many :rebloggers, through: :reblogs, source: :tracks
  has_many :likers, through: :likes, source: :likes


  belongs_to(
    :poster,
    class_name: "User",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :tracks,
    counter_cache: true
  )

  validates :title, :artist, :poster, presence: true

end
