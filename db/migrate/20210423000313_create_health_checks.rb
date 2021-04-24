class CreateHealthChecks < ActiveRecord::Migration[6.1]
  def change
    create_table :health_checks do |t|
      t.belongs_to :squad, null: false, foreign_key: true
      t.timestamp :started_at
      t.timestamp :ended_at

      t.timestamps
    end
  end
end
