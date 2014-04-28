class NotificationsController < ApplicationController
  before_action :require_signed_in!

  def index
    @notifications = Notification.all.where(["user_id = ?", current_user.id])
  end

  def show
    notification = current_user.notifications.find(params[:id])
    notification.update(is_read: true)
    redirect_to notification.url
  end
end
