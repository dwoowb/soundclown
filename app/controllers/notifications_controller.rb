class NotificationsController < ApplicationController
  def index
    @notifications = Notification.all
  end
end
