class IShouldBeBetterAboutThis < ActiveRecord::Migration
  def change
    remove_column :users, :follows_count, :integer
    add_column :users, :in_follows_count, :integer
    add_column :users, :out_follows_count, :integer
  end
end
