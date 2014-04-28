class User < ActiveRecord::Base

  has_attached_file :avatar, styles: { thumb: "100x100>", full: "300x300>", default_url: "/images/:style/missing.png"}
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many(
    :tracks,
    class_name: "Track",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :poster,
    dependent: :destroy
  )

  has_many :reblogged_tracks, through: :reblogs, source: :rebloggable, source_type: "Track"
  has_many :liked_tracks, through: :likes, source: :likeable, source_type: "Track"
  has_many :reblogged_playlists, through: :reblogs, source: :rebloggable, source_type: "Playlist"
  has_many :liked_playlists, through: :likes, source: :likeable, source_type: "Playlist"


  has_many(
    :playlists,
    class_name: "Playlist",
    foreign_key: :creator_id,
    primary_key: :id,
    inverse_of: :creator,
    dependent: :destroy
  )

  has_many(
    :notifications,
    class_name: "Notification",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many(
    :in_follows,
    class_name: "Follow",
    foreign_key: :followee_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many(
    :out_follows,
    class_name: "Follow",
    foreign_key: :follower_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many :followers, through: :in_follows, source: :follower
  has_many :followees, through: :out_follows, source: :followee

  has_many(
    :reblogs,
    class_name: "Reblog",
    foreign_key: :reblogger_id,
    primary_key: :id,
    inverse_of: :reblogger,
    dependent: :destroy
  )

  has_many(
    :likes,
    class_name: "Like",
    foreign_key: :liker_id,
    primary_key: :id,
    inverse_of: :liker,
    dependent: :destroy
  )

  has_many(
    :authored_comments,
    class_name: "Comment",
    foreign_key: :commenter_id,
    primary_key: :id,
    inverse_of: :commenter,
    dependent: :destroy
  )

  before_validation :ensure_session_token

  validates :password_digest, :email, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :email, :session_token, uniqueness: true

  attr_reader :password

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    #BCrypt will readily encrypt an empty string, probably don't want that...
    if password.present?
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
