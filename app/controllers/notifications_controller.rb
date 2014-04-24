class NotificationsController < ApplicationController
  before_action :require_signed_in!

  def index
    @notifications = Notification.all.where(["user_id = ?", current_user.id])
  end
end
