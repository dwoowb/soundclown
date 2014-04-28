class ReblogsController < ApplicationController

  def create
    @reblog = Reblog.new(reblog_params)
    if @reblog.save
      # user feedback about reblogging track
      create_notification!(@reblog)
      redirect_to :back
    else
      flash.now[:errors] = @reblog.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    @reblog = Reblog.find_by(rebloggable_id: reblog_params[:rebloggable_id])
    @reblog.destroy!
    redirect_to :back
  end

  def create_notification!(reblog)
    if reblog.rebloggable_type == "Track"
      track = Track.find(reblog.rebloggable_id)
      notified_user = track.poster
      Notification.create!({
        user_id: notified_user.id,
        event_id: 5,
        notifiable_id: reblog.id,
        notifiable_type: "Reblog"
      })
    elsif reblog.rebloggable_type == "Playlist"
      playlist = Playlist.find(reblog.rebloggable_id)
      notified_user = playlist.creator
      Notification.create!({
        user_id: notified_user.id,
        event_id: 6,
        notifiable_id: reblog.id,
        notifiable_type: "Reblog"
      })
    end


  end

  private

  def reblog_params
    params.require(:reblog).permit(:rebloggable_id, :rebloggable_type, :reblogger_id)
  end
end
