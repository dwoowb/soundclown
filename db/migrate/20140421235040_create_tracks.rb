class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.integer :poster_id, null: false

      t.timestamps
    end

    add_index :tracks, :poster_id
  end
end
