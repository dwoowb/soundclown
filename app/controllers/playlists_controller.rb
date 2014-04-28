class PlaylistsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @playlists = current_user.playlists
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists
  end

  def new
    @track = Track.find(params[:playlist][:track_ids])
    # why does this retrieve an array with one object? as opposed to just the object
    @playlists = current_user.playlists
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.track_ids = params[:playlist][:track_ids]
    if @playlist.save
      redirect_to user_playlists_url(current_user.id)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      redirect_to :back
    end
  end

  def update
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      redirect_to :back
    else
      flash.now[:errors] = @playlist.errors.full_messages
      redirect_to :back
    end
  end

  def add_track
    @playlist = Playlist.find(params[:id])
    current_track_ids = @playlist.track_ids
    current_track_ids << params[:playlist][:track_id].to_i
    @playlist.update(track_ids: current_track_ids)
    redirect_to playlist_url(@playlist)
  end

  def remove_track
    @playlist = Playlist.find(params[:id])
    current_track_ids = @playlist.track_ids
    current_track_ids.delete(params[:playlist][:track_id].to_i)
    @playlist.update(track_ids: current_track_ids)
    redirect_to playlist_url(@playlist)
  end

  def show
    @playlist = Playlist.find(params[:id])
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists
    @creator = User.find(@playlist.creator_id)
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    redirect_to :back
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :creator_id)
  end
end
