class PlaylistsController < ApplicationController
  def index
    @playlists = current_user.playlists
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
      @playlist.track_ids.concat(params[:playlist][:track_ids])
      redirect_to :back
    else
      flash.now[:errors] = @playlist.errors.full_messages
      redirect_to :back
    end
  end

  def remove_track
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      @playlist.track_ids.delete(params[:playlist][:track_ids])
      redirect_to :back
    else
      flash.now[:errors] = @playlist.errors.full_messages
      redirect_to :back
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    # @user = User.find(playlist_params[:creator_id])
    # @my_reblogged_playlists = current_user.reblogged_playlists
    @creator = User.find(@playlist.creator_id)
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy!
    redirect_to :back
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :creator_id)
  end
end
