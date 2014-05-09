class Api::LikesController < ApplicationController

  def index
    @likes = User.find(params[:user_id]).likes
    render partial: "api/likes/index", locals: { likes: @likes }
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      # user feedback about liking track
      render json: @like
    else
      flash.now[:errors] = @like.errors.full_messages
      render json: @like.errors, status: :unprocessable_entity
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
