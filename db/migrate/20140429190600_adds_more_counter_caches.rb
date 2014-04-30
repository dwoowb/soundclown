class AddsMoreCounterCaches < ActiveRecord::Migration
  def change
    add_column :comments, :notifications_count, :integer
    add_column :likes, :notifications_count, :integer
    add_column :reblogs, :notifications_count, :integer
    add_column :follows, :notifications_count, :integer
  end
end
