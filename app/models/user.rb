class User < ActiveRecord::Base

  has_many(
    :tracks,
    class_name: "Track",
    foreign_key: :poster_id,
    primary_key: :id,
    inverse_of: :poster,
    dependent: :destroy
  )

  has_many(
    :reblogs,
    class_name: "Reblog",
    foreign_key: :reblogger_id,
    primary_key: :id,
    inverse_of: :reblogger,
    dependent: :destroy
  )

  has_many :comments, as: :commentable

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
