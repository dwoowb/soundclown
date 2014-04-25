class TracksController < ApplicationController
  before_action :require_signed_in!, except: [:show]

  def index
    @tracks = Track.where(poster_id: current_user.id)
  end

  def add_to_playlist
    @track = Track.find(playlist_params[:track])
    @playlists = current_user.playlists
  end

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      redirect_to user_tracks_url(current_user)
    else
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def show
    @track = Track.find(params[:id])
    @my_reblogged_tracks = current_user.reblogged_tracks
    @poster = User.find(@track.poster_id)
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy!
    redirect_to user_tracks_url(current_user)
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist, :poster_id)
  end
  
  def playlist_params
    params.require(:playlist).permit(:creator_id, :track)
  end

end
