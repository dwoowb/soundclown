class CreateReblogs < ActiveRecord::Migration
  def change
    create_table :reblogs do |t|
      t.integer :reblogger_id, null: false
      t.integer :track_id, null: false

      t.timestamps
    end
    add_index :reblogs, :reblogger_id
    add_index :reblogs, :track_id
  end
end
