class AddsFirstAndLastNameColumns < ActiveRecord::Migration
  def change
    add_column :users, :fname, :string
    add_column :users, :lname, :string
  end
end
