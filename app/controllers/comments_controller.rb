class CommentsController < ApplicationController

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
    @comment.destroy!

    redirect_to :back
  end

  private

  def comment_params
    params.require(:comment).permit(:commentable_id, :commentable_type, :body)
  end
end
