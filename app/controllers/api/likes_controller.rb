class Api::LikesController < ApplicationController

  def index
    @likes = User.find(params[:user_id]).likes
    render partial: "api/likes/index.json", locals: { likes: @likes }
  end

  def create
    @like = current_user.likes.create(like_params)
    if @like.save
      render partial: "api/likes/show.json", locals: { like: @like }
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    render partial: "api/likes/show.json", locals: { like: @like }
  end

  private

  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :liker_id)
  end
end
