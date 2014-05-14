class Api::TracksController < ApplicationController
  before_action :require_signed_in!, except: [:show]

  def index
    @user = User.find(params[:user_id])
    @tracks = @user.tracks
    @my_liked_tracks = current_user.liked_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks

    render partial: "api/tracks/index.json", locals: { tracks: @tracks }
  end

  def new
    @track = Track.new
    render partial: "api/users/show.json", locals: { track: @track }
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      render partial: "api/users/show.json", locals: { poster: current_user }
    else
      flash.now[:errors] = @track.errors.full_messages
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  def show
    @track = Track.find(params[:id])
    render partial: "api/tracks/show.json",
           locals: { track: @track,
                     comments: @track.comments,
                     likes: @track.likes,
                     reblogs: @track.reblogs }
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render partial: "api/users/show.json", locals: { user: @track.poster }
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist, :poster_id)
  end

end
