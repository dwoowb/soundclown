class Api::PlaylistsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @playlists = @user.playlists
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists

    render partial: "api/playlists/index.json", locals: { playlists: @playlists }
  end

  def new
    @track = Track.find(params[:playlist][:track_ids])
    # why does this retrieve an array with one object? as opposed to just the object
    @playlists = current_user.playlists
    render json: @track
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.track_ids = params[:playlist][:track_ids]

    if @playlist.save
      render partial: "api/users/show.json", locals: { poster: current_user }
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  def update
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      render partial: "api/users/show.json", locals: { poster: current_user }
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    @creator = User.find(@playlist.creator_id)
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists

    render partial: "api/playlists/show.json", locals: { creator: @creator, playlist: @playlist}
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render partial: "api/users/show.json", locals: { poster: current_user }
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :creator_id)
  end
end
