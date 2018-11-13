class ReportSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at

  belongs_to :equipment
end
