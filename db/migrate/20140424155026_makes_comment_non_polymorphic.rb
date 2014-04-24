class MakesCommentNonPolymorphic < ActiveRecord::Migration
  def change
    remove_column :comments, :commentable_id
    remove_column :comments, :commentable_type
    add_column    :comments, :track_id, :integer
  end
end
