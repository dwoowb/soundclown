class MoreCounterCaches < ActiveRecord::Migration
  def change
    add_column :users, :playlists_count, :integer
    add_column :playlists, :playlist_tracks_count, :integer
  end
end
