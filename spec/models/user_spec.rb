require 'spec_helper'

describe User do

  subject(:user) do
    FactoryGirl.build(:user,
    email: "example@email.com",
    password: "right_password")
  end

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should ensure_length_of(:password).is_at_least(6) }

  #associations testing
  it { should have_many(:tracks) }

  it "creates a password digest when a password is given" do
    expect(user.password_digest).to_not be_nil
  end

  it "creates a session token before validation" do
    user.valid?
    expect(user.session_token).to_not be_nil
  end

  describe "#reset_session_token!" do
    it "sets a new session token for the user" do
      user.valid?
      old_session_token = user.session_token
      user.reset_session_token!

      # Miniscule chance of failure? Porque
      expect(user.session_token).to_not eq(old_session_token)
    end
  end

  describe "#is_password?" do
    it "verifies that a password is correct" do
      expect(user.is_password?("right_password")).to be_true
    end

    it "verifies that a password is incorrect" do
      expect(user.is_password?("wrong_password")).to be_false
    end
  end

  describe ".find_by_credentials" do
    before { user.save! }

    it "returns user given passing credentials" do
      expect(User.find_by_credentials("example@email.com", "right_password")).to eq(user)
    end

    it "returns nil given failing credentials" do
      expect(User.find_by_credentials("example@email.com", "wrong_password")).to eq(nil)
    end
  end

end
