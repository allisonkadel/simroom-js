class User < ApplicationRecord
    has_many :trainings
    has_many :equipment, :through => :trainings

    has_secure_password

    validates :email, :presence => true
    validates :email, :uniqueness => true
    validates :password, :presence => true

    def self.find_or_create_by_omniauth(auth_hash)
        self.where(:email => auth_hash["info"]["nickname"]).first_or_create do |user|
            user.password = SecureRandom.hex
        end
    end
end
