class AddsCreatorIdColumnToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :creator_id, :integer
  end
end
