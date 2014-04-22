require 'spec_helper'

describe Track do

  # subject(:user) do
  #   FactoryGirl.build(:user,
  #   email: "example@email.com",
  #   password: "right_password")
  # end
  #
  # subject(:track) do
  #   FactoryGirl.build(:track,
  #   title: "Give Life Back to Music",
  #   artist: "Daft Punk",
  #   poster: :user)
  # end

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:artist) }
  it { should validate_presence_of(:poster) }

  it { should belong_to(:poster) }

  it "associates with the correct user before save through inverse_of" do
    user = FactoryGirl.build(:user)
    track = user.tracks.new
    expect(track.poster).to be(user)
  end


end
