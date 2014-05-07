class PlaylistsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @playlists = @user.playlists
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists


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
      redirect_to user_playlists_url(current_user.id)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      redirect_to :back
    end

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
      render json: @playlist
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render json: @user.errors, status: :unprocessable_entity
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
    @creator = User.find(@playlist.creator_id)
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists

    render partial: "api/playlists/show.json", locals: { creator: @creator, playlist: @playlist}
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
