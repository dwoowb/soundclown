class CommentsController < ApplicationController
  # after_action :create_notification, only: [:create, :destroy]

  def create
    @comment = Comment.new(comment_params)
    @comment.commenter_id = current_user.id

    unless @comment.save
      flash.now[:errors] = @comment.errors.full_messages
    end
    create_notification!(@comment)
    redirect_to :back
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
    create_notification!(@comment)
    redirect_to :back
  end

  def create_notification!(comment)
    track = Track.find(comment.track_id)
    notified_user = track.poster
    event_id = 6


    Notification.create!({
      user_id: notified_user.id,
      event_id: event_id,
      notifiable_id: comment.id,
      notifiable_type: "Comment"
    })
  end

  private

  def comment_params
    params.require(:comment).permit(:track_id, :body)
  end
end
