class Api::PlaylistsController < ApplicationController
  def index
    @playlists = User.find(params[:user_id]).playlists
    render partial: "api/playlists/index.json", locals: { playlists: @playlists }
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      render partial: "api/playlists/show.json",
             locals: { playlist: @playlist,
                       likes: @playlist.likes,
                       reblogs: @playlist.reblogs,
                       playlistTracks: @playlist.playlist_tracks,
                     }
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  def update
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      render partial: "api/playlists/show.json",
             locals: { playlist: @playlist,
                       likes: @playlist.likes,
                       reblogs: @playlist.reblogs,
                       playlistTracks: @playlist.playlist_tracks,
                     }
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    render partial: "api/playlists/show.json",
           locals: { playlist: @playlist,
                     likes: @playlist.likes,
                     reblogs: @playlist.reblogs,
                     playlistTracks: @playlist.playlist_tracks,
                   }
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render partial: "api/playlists/show.json",
           locals: { playlist: @playlist,
                     likes: @playlist.likes,
                     reblogs: @playlist.reblogs,
                     playlistTracks: @playlist.playlist_tracks,
                   }
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :creator_id)
  end
end
