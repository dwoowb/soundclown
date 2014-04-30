class ChangeFollowsCounterCache < ActiveRecord::Migration
  def change
    remove_column :users, :followers_count
    remove_column :users, :followees_count
    add_column :users, :in_follows_count, :integer
    add_column :users, :out_follows_count, :integer
  end
end
