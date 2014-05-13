class Api::CommentsController < ApplicationController

  def index
    @comments = User.find(params[:user_id]).authored_comments
    render partial: "api/comments/index.json", locals: { comments: @comments }
  end

  def create
    @comment = Comment.new(comment_params)
    @track = @comment.track

    if @comment.save
      render partial: "api/comments/show.json", locals: { comment: @comment }
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render partial: "api/comments/show.json", locals: { comment: @comment }
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commenter_id, :track_id)
  end
end
