class Api::ReblogsController < ApplicationController

  def index
    @reblogs = User.find(params[:user_id]).reblogs
    render partial: "api/reblogs/index.json", locals: { reblogs: @reblogs}
  end

  def create
    @reblog = Reblog.new(reblog_params)
    if @reblog.save
      # user feedback about reblogging track
      render json: @reblog
    else
      flash.now[:errors] = @reblog.errors.full_messages
      render json: @reblog.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @reblog = Reblog.find_by(rebloggable_id: reblog_params[:rebloggable_id])
    @reblog.destroy
    redirect_to :back
  end

  private

  def reblog_params
    params.require(:reblog).permit(:rebloggable_id, :rebloggable_type, :reblogger_id)
  end
end
