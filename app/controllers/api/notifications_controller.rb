class Api::NotificationsController < ApplicationController
  before_action :require_signed_in!

  def index
    @notifications = current_user.notifications
  end

  def show
    notification = current_user.notifications.find(params[:id])
    notification.update(is_read: true)
    redirect_to notification.url
  end
end
