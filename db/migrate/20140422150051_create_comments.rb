class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :commenter_id, null: false
      t.references :commentable, polymorphic: true

      t.timestamps
    end

    add_index :comments, :commenter_id
  end
end
