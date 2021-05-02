# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_01_011248) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "health_checks", force: :cascade do |t|
    t.bigint "squad_id", null: false
    t.datetime "started_at"
    t.datetime "ended_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["squad_id"], name: "index_health_checks_on_squad_id"
  end

  create_table "people", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "squads", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "health_check_id", null: false
    t.string "value"
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "person_id"
    t.index ["health_check_id"], name: "index_votes_on_health_check_id"
    t.index ["person_id", "health_check_id", "value"], name: "index_votes_on_person_id_and_health_check_id_and_value", unique: true
    t.index ["person_id"], name: "index_votes_on_person_id"
  end

  add_foreign_key "health_checks", "squads"
  add_foreign_key "votes", "health_checks"
  add_foreign_key "votes", "people"
end
