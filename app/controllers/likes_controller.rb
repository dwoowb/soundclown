class LikesController < ApplicationController

  def create
    @like = Like.new(like_params)
    if @like.save
      # user feedback about reblogging track
      create_notification!(@like)
      redirect_to :back
    else
      flash.now[:errors] = @like.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    @like = Like.find_by(likeable_id: like_params[:likeable_id])
    @like.destroy!
    redirect_to :back
  end

  def create_notification!(like)
    if like.likeable_type == "Track"
      track = Track.find(like.likeable_id)
      notified_user = track.poster
    elsif like.likeable_type == "Playlist"
      playlist = Playlist.find(like.likeable_id)
      notified_user = playlist.creator
    end

    Notification.create!({
      user_id: notified_user.id,
      event_id: 5,
      notifiable_id: like.id,
      notifiable_type: "Like"
    })
  end

  private

  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :liker_id)
  end
end
