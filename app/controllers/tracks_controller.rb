class TracksController < ApplicationController
  before_action :require_signed_in!, except: [:show]

  def index
    @user = User.find(params[:user_id])
    @tracks = @user.tracks
    @my_liked_tracks = current_user.liked_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks
  end

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      redirect_to user_playlists_url(current_user.id)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      redirect_to :back
    end
  end

  def show
    @track = Track.find(params[:id])
    @poster = User.find(@track.poster_id)
    @my_liked_tracks = current_user.liked_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    redirect_to :back
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist, :poster_id, :music_file)
  end

end
