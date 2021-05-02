class Person < ApplicationRecord
  include Hashid::Rails

  has_many :votes, dependent: :destroy
end
