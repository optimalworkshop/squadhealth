class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.timestamps
    end

    change_table :votes do |t|
      t.belongs_to :person, foreign_key: true
      t.index %i[person_id health_check_id value], unique: true
    end
  end
end
