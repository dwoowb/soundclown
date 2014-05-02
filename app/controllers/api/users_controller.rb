class Api::UsersController < ApplicationController
  before_action :require_signed_in!, except: [:new, :create]
  before_action :require_signed_out!, only: [:new, :create]

  def index
    @users = User.all
    render json: @users
  end

  def stream
    followees = current_user.followees
    # stream_items are followee's uploaded/reblogged tracks/playlists
    @stream_items = []
    followees.each do |followee|
      reblogs = followee.reblogs
      created_items = followee.tracks + followee.playlists
      @stream_items.concat(reblogs).concat(created_items)
    end
    unless @stream_items.empty?
      @stream_items = @stream_items.sort_by(&:created_at).reverse!
    end

    render json: @stream_items
  end

  def show
    @user = User.find(params[:id])
    render partial: "users/show", locals: { user: @user }
  end

  def edit
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(params[:id])
    @user.destroy if @user
    redirect_to root_url
  end

  def followers
    @user = User.find(params[:user_id])
  end

  def followees
    @user = User.find(params[:user_id])
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :fname, :lname, :city, :avatar)
  end
end
