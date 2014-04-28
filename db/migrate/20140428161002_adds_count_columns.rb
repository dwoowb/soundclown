class AddsCountColumns < ActiveRecord::Migration
  def change
    add_column :users, :comments_count, :integer
    add_column :users, :likes_count, :integer
    add_column :users, :followers_count, :integer
    add_column :users, :followees_count, :integer
    add_column :users, :notifications_count, :integer
    add_column :users, :tracks_count, :integer

    add_column :tracks, :likes_count, :integer
    add_column :tracks, :reblogs_count, :integer
    add_column :tracks, :comments_count, :integer

    add_column :playlists, :likes_count, :integer
    add_column :playlists, :reblogs_count, :integer
  end
end
