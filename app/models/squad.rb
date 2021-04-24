class Squad < ApplicationRecord
  include Hashid::Rails

  has_many :health_checks, dependent: :destroy
end
