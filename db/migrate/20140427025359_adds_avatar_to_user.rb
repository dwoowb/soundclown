class AddsAvatarToUser < ActiveRecord::Migration
  def change
    add_attachment :users, :avatar
  end
end
