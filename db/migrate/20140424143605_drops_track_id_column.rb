class DropsTrackIdColumn < ActiveRecord::Migration
  def change
    remove_column :reblogs, :track_id
  end
end
