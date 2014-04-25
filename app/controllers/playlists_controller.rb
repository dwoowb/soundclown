class PlaylistsController < ApplicationController
  def index
    @playlists = current_user.playlists
  end
  
  def new
    
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      redirect_to :back
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

  def show
    @playlist = Playlist.find(params[:id])
    @my_reblogged_playlists = current_user.reblogged_playlists
    @creator = User.find(@playlist.creator_id)
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy!
    redirect_to :back
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title)
  end
end
