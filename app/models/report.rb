class Report < ApplicationRecord
    belongs_to :equipment
    validates :content, :presence => :true
end