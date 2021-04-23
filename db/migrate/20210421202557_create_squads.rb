class CreateSquads < ActiveRecord::Migration[6.1]
  def change
    create_table :squads, &:timestamps
  end
end
