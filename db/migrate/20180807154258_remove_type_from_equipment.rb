class RemoveTypeFromEquipment < ActiveRecord::Migration[5.2]
  def change
    remove_column :equipment, :type
  end
end
