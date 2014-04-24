class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :title, null: false

      t.timestamps
    end
  end
end
