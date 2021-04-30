class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.belongs_to :health_check, null: false, foreign_key: true
      t.string :value
      t.integer :score
      t.timestamps
    end
  end
end
