class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)

    if @follow.save
      render partial: "api/follows/show.json", locals: { follow: @follow }
    else
      render json: @follow.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
    render partial: "api/follows/show.json", locals: { follow: @follow }
  end

  private

  def follow_params
    params.require(:follow).permit(:follower_id, :followee_id)
  end

end
