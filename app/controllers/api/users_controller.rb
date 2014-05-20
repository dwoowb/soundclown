class Api::UsersController < ApplicationController
  before_action :require_signed_in!, except: [:new, :create]
  before_action :require_signed_out!, only: [:new, :create]

  def stream
    @user = current_user
    render partial: "api/users/show.json", locals: { user: @user }
  end

  def show
    @user = User.includes(:tracks,
                          :playlists,
                          :followees,
                          :followers,
                          :liked_tracks,
                          :reblogged_tracks,
                          :liked_playlists,
                          :reblogged_playlists)
                          .find(params[:id])

    render partial: "api/users/show.json", locals: { user: @user }
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render partial: "api/users/show.json", locals: { user: @user }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(params[:id])
    @user.destroy if @user
    render partial: "api/users/show.json", locals: { user: @user }
  end

  def followers
    @user = User.find(params[:user_id])
    render partial: "api/users/show.json", locals: { user: @user }
  end

  def followees
    @user = User.find(params[:user_id])
    render partial: "api/users/show.json", locals: { user: @user }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :fname, :lname, :city, :avatar)
  end
end