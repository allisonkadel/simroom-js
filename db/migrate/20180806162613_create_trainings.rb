class CreateTrainings < ActiveRecord::Migration[5.2]
  def change
    create_table :trainings do |t|
      t.string :name
      t.text :description
      t.date :date
      t.string :simroom
      t.integer :user_id
      t.integer :equipment_id

      t.timestamps
    end
  end
end
