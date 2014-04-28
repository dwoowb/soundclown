class ChangesReadColumnName < ActiveRecord::Migration
  def change
    remove_column :notifications, :read
    add_column    :notifications, :is_read, :boolean, default: false
  end
end
