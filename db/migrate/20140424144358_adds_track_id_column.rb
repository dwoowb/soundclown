class AddsTrackIdColumn < ActiveRecord::Migration
  def change
    add_column :reblogs, :track_id, :integer
  end
end
