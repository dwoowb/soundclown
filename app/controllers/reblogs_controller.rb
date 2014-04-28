class ReblogsController < ApplicationController

  def create
    @reblog = Reblog.new(reblog_params)
    if @reblog.save
      # user feedback about reblogging track
      redirect_to :back
    else
      flash.now[:errors] = @reblog.errors.full_messages
      redirect_to :back
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
