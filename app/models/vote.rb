class Vote < ApplicationRecord
  belongs_to :health_check
  belongs_to :person
end
