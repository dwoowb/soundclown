class ReblogsController < ApplicationController

  def create
    @reblog = Reblog.new(reblog_params)

    if @reblog.save
      #should add this track to profile
      #should increment number of reblogs to track
      redirect_to :back
    else
      flash.now[:errors] = @reblog.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    @reblog = Reblog.find(params[:id])
    @reblog.destroy!
    redirect_to :back
  end

  private

  def reblog_params
    params.require(:reblog).permit(:reblogger_id, :track_id)
  end
end
