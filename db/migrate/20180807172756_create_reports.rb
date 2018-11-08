class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.text :content
      t.integer :equipment_id
      t.datetime :created_at
    end
  end
end
