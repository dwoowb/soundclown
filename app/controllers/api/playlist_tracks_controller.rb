class Api::PlaylistTracksController < ApplicationController

  def create
    @playlist_track = PlaylistTrack.new(playlist_track_params)

    if @playlist_track.save
      render partial: "api/playlist_tracks/show.json", locals: { playlistTrack: @playlist_track }
    else
      render json: @playlist_track.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @playlist_track = PlaylistTrack.find(params[:id])
    @playlist_track.destroy
    render partial: "api/playlist_tracks/show.json", locals: { playlistTrack: @playlist_track }
  end

  private

  def playlist_track_params
    params.require(:playlist_track).permit(:track_id, :playlist_id)
  end
end
