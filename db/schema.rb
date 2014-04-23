# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140423190456) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.text     "body",             null: false
    t.integer  "commenter_id",     null: false
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["commenter_id"], name: "index_comments_on_commenter_id", using: :btree

  create_table "follows", force: true do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "follows", ["followee_id"], name: "index_follows_on_followee_id", using: :btree
  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree

  create_table "notifications", force: true do |t|
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.integer  "user_id",         null: false
    t.integer  "event_id",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "notifications", ["event_id"], name: "index_notifications_on_event_id", using: :btree
  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "reblogs", force: true do |t|
    t.integer  "reblogger_id", null: false
    t.integer  "track_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reblogs", ["reblogger_id"], name: "index_reblogs_on_reblogger_id", using: :btree
  add_index "reblogs", ["track_id"], name: "index_reblogs_on_track_id", using: :btree

  create_table "tracks", force: true do |t|
    t.string   "title",      null: false
    t.string   "artist",     null: false
    t.integer  "poster_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tracks", ["poster_id"], name: "index_tracks_on_poster_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "username"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "city"
    t.string   "fname"
    t.string   "lname"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
