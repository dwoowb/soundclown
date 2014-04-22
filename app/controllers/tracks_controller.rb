class TracksController < ApplicationController
  before_action :require_signed_in!, except: [:show]

  def index
    @tracks = Track.all.where(["poster_id = ?", current_user.id])
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

end
