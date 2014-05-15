class Api::PlaylistTracksController < ApplicationController

  def create
    @playlist_track = PlaylistTrack.new(playlist_track_params)

    if @playlist_track.save
      head :ok
    else
      render json: @playlist_track.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @playlist_track = PlaylistTrack.find(params[:id])
    @playlist_track.destroy
    head :ok
  end

  private

  def playlist_track_params
    params.require(:playlist_track).permit(:track_id, :playlist_id)
  end
end
