class TracksController < ApplicationController
  before_action :require_signed_in!, except: [:show]

  def index
    @user = User.find(params[:user_id])
    @tracks = @user.tracks
    @my_liked_tracks = current_user.liked_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks

    render partial: "tracks/index.json", locals: { poster: @user, tracks: @tracks }
  end

  def new
    @track = Track.new
    render json: @track
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      render partial: "tracks/index.json", locals: { poster: @user, tracks: @tracks }
    else
      flash.now[:errors] = @track.errors.full_messages
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    @track = Track.find(params[:id])
    @poster = User.find(@track.poster_id)
    @my_liked_tracks = current_user.liked_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks

    render partial: "tracks/show.json", locals: { poster: @poster, track: @track}
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render partial: "users/show.json", locals: { user: @track.poster }
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist, :poster_id)
  end

end
