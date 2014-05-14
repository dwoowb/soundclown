class Api::ReblogsController < ApplicationController

  def index
    @reblogs = User.find(params[:user_id]).reblogs
    render partial: "api/reblogs/index.json", locals: { reblogs: @reblogs}
  end

  def create
    @reblog = current_user.reblogs.create(reblog_params)
    if @reblog.save
      render partial: "api/reblogs/show.json", locals: { reblog: @reblog}
    else
      render json: @reblog.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @reblog = Reblog.find(params[:id])
    @reblog.destroy
    render partial: "api/reblogs/show.json", locals: { reblog: @reblog}
  end

  private

  def reblog_params
    params.require(:reblog).permit(:rebloggable_id, :rebloggable_type, :reblogger_id)
  end
end
