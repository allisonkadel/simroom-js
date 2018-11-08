class CreateEquipment < ActiveRecord::Migration[5.2]
  def change
    create_table :equipment do |t|
      t.string :name
      t.string :type
      t.text :report

      t.timestamps
    end
  end
end
