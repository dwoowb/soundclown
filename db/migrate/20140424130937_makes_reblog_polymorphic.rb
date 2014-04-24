class MakesReblogPolymorphic < ActiveRecord::Migration
  def change
    add_column :reblogs, :rebloggable_id, :integer
    add_column :reblogs, :rebloggable_type, :string
  end
end
