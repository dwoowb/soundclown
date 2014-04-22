require 'spec_helper'

describe Reblog do
  it { should validate_presence_of(:reblogger) }
  it { should validate_presence_of(:track) }

  it { should belong_to(:reblogger) }
  it { should belong_to(:track) }

  it "associates with the correct user before save through inverse_of" do
    user = FactoryGirl.build(:user)
    reblog = user.reblogs.new

    expect(reblog.reblogger).to be(user)
  end

  it "associates with the correct track before save through inverse_of" do
    track = FactoryGirl.build(:track)
    reblog = track.reblogs.new

    expect(reblog.track).to be(track)
  end

  #polymorphic association testing
end
