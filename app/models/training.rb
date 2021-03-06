class Training < ApplicationRecord
    belongs_to :user
    belongs_to :equipment

    validates :name, :presence => true
    validates :name, :uniqueness => true
    validates :description, :presence => true
    validates :date, :presence => true
    validates :simroom, :presence => true

    scope :future_trainings, -> { where("date > ?", Date.yesterday) }
    scope :past_trainings, -> { where("date < ?", Date.today) }

    def next
        training = Training.where("id > ?", id).first

        if training
            training
        else
            Training.first
        end
    end
end
