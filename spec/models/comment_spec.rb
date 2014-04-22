require 'spec_helper'

describe Comment do

  it { should validate_presence_of(:body) }
  it { should validate_presence_of(:commenter) }

  it { should belong_to(:commenter) }

  it "associates with the correct user before save through inverse_of" do
    user = FactoryGirl.build(:user)
    comment = user.authored_comments.new

    expect(comment.commenter).to be(user)
  end

  #polymorphic association testing

end
