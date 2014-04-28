class FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)

    if @follow.save
      redirect_to :back
    else
      flash.now[:errors] = @follow.errors.full_messages
      redirect_to :back
    end
  end

  def show
    @user = User.find(params[:user_id])
  end

  def destroy
    @follow = Follow.find_by(followee_id: follow_params[:followee_id])
    @follow.destroy
    redirect_to :back
  end

  private

  def follow_params
    params.require(:follow).permit(:follower_id, :followee_id)
  end

end
