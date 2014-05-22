class Api::TracksController < ApplicationController
  before_action :require_signed_in!, except: [:show]

  def index
    @tracks = User.find(params[:user_id]).tracks
    render partial: "api/tracks/index.json", locals: { tracks: @tracks }
  end

  def new
    @track = Track.new
    render partial: "api/tracks/show.json",
           locals: { track: @track,
                     comments: @track.comments,
                     likes: @track.likes,
                     reblogs: @track.reblogs,
                     playlistTracks: @track.playlist_tracks,
                   }
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      render partial: "api/tracks/show.json",
             locals: { track: @track,
                       comments: @track.comments,
                       likes: @track.likes,
                       reblogs: @track.reblogs,
                       playlistTracks: @track.playlist_tracks,
                     }
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  def update
    @track = Track.find(params[:id])
    @track.update(track_params)
    render partial: "api/tracks/show.json",
           locals: { track: @track,
                     comments: @track.comments,
                     likes: @track.likes,
                     reblogs: @track.reblogs,
                     playlistTracks: @track.playlist_tracks,
                   }
  end

  def show
    @track = Track.find(params[:id])
    render partial: "api/tracks/show.json",
           locals: { track: @track,
                     comments: @track.comments,
                     likes: @track.likes,
                     reblogs: @track.reblogs,
                     playlistTracks: @track.playlist_tracks,
                   }
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render partial: "api/tracks/show.json",
           locals: { track: @track,
                     comments: @track.comments,
                     likes: @track.likes,
                     reblogs: @track.reblogs,
                     playlistTracks: @track.playlist_tracks,
                   }
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist, :poster_id, :music_file)
  end

end
