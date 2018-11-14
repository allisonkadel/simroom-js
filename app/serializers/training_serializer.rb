class TrainingSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :date, :simroom

  belongs_to :user
  belongs_to :equipment
end
