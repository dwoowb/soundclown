class Api::PlaylistsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @playlists = @user.playlists
    @my_liked_playlists = current_user.liked_playlists
    @my_reblogged_playlists = current_user.reblogged_playlists

    render partial: "api/playlists/index.json", locals: { playlists: @playlists }
  end

  def new
    @playlist = Playlist.new
    render partial: "api/playlists/show.json",
           locals: { playlist: @playlist,
                     likes: @playlist.likes,
                     reblogs: @playlist.reblogs
                   }
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      render partial: "api/playlists/show.json",
             locals: { playlist: @playlist,
                       likes: @playlist.likes,
                       reblogs: @playlist.reblogs
                     }
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  def update
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      render partial: "api/playlists/show.json",
             locals: { playlist: @playlist,
                       likes: @playlist.likes,
                       reblogs: @playlist.reblogs
                     }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    render partial: "api/playlists/show.json",
           locals: { playlist: @playlist,
                     likes: @playlist.likes,
                     reblogs: @playlist.reblogs
                   }
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render partial: "api/playlists/show.json", locals: { playlist: @playlist }
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :creator_id)
  end
end
