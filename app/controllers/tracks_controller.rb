class TracksController < ApplicationController

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      redirect_to :user_url(track_params[:poster_id])
    else
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def show
    @track = Track.find(params[:id])
    redirect_to :user_url(@track.poster_id)
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy!
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist, :poster_id)
  end
end
