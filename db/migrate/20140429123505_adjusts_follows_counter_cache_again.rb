class AdjustsFollowsCounterCacheAgain < ActiveRecord::Migration
  def change
    remove_column :users, :in_follows_count
    remove_column :users, :out_follows_count
    add_column :users, :follows_count, :integer
  end
end
