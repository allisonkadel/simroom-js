class Equipment < ApplicationRecord
    has_many :trainings
    has_many :users, :through => :trainings
    has_many :reports

    accepts_nested_attributes_for :reports

    validates :name, :presence => true
    validates :name, :uniqueness => true
end
