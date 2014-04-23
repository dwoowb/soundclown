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
    @reblog = Reblog.find_by(track_id: reblog_params[:track_id])
    @reblog.destroy!
    redirect_to :back
  end

  private

  def reblog_params
    params.require(:reblog).permit(:reblogger_id, :track_id)
  end
end
