class UsersController < ApplicationController
  before_action :require_signed_in!, except: [:new, :create]
  before_action :require_signed_out!, only: [:new, :create]

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
  end

  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
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

    @tracks = @user.tracks
    @playlists = @user.playlists
    @followees = @user.followees
    @liked_tracks = @user.liked_tracks
    @my_liked_tracks = current_user.liked_tracks
    @reblogged_tracks = @user.reblogged_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks
    @my_reblogged_playlists = current_user.reblogged_playlists
    @liked_playlists = @user.liked_playlists
    @my_liked_playlists = current_user.liked_playlists
    @reblogged_playlists = @user.reblogged_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists

    @stream_items = (@playlists +  @tracks + @user.reblogs)
    unless @stream_items.empty?
      @stream_items = @stream_items.sort_by(&:created_at).reverse!
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
    @user = User.find_by(params[:id])
    @user.destroy
    redirect_to new_session_url
  end

  def followers
    @user = User.find(params[:id])
  end

  def followees
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :fname, :lname, :city, :avatar)
  end
end

