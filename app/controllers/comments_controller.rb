class CommentsController < ApplicationController
  # after_action :create_notification, only: [:create, :destroy]

  def index
    @user = User.find(params[:user_id])
    @comments = @user.authored_comments
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.commenter_id = current_user.id

    unless @comment.save
      flash.now[:errors] = @comment.errors.full_messages
    end
    redirect_to :back
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to :back
  end

  private

  def comment_params
    params.require(:comment).permit(:track_id, :body)
  end
end
