class LikesController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    likes = @user.likes
    @liked_items = []
    likes.each do |like|
      @liked_items << like.likeable
    end
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      # user feedback about liking track
      redirect_to :back
    else
      flash.now[:errors] = @like.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    @like = Like.find_by!(likeable_id: like_params[:likeable_id])
    @like.destroy
    redirect_to :back
  end

  private

  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :liker_id)
  end
end
