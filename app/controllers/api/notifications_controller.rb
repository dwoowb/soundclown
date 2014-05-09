class Api::NotificationsController < ApplicationController
  before_action :require_signed_in!

  def index
    @notifications = current_user.notifications
    render partial: "api/notifications/index.json", locals: { notifications: notifications }
  end

  def show
    notification = current_user.notifications.find(params[:id])
    notification.update(is_read: true)
    render partial: "api/notifications/show.json", locals: { notification: notification }
  end
end
