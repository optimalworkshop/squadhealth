class Squad < ApplicationRecord
  include Hashid::Rails

  has_many :health_checks, dependent: :destroy

  def increment_online_count(by: 1)
    update!(online_count: online_count + by)
    SquadhealthSchema.subscriptions.trigger(:online_count, { id: to_param }, online_count)
  end

  def decrement_online_count
    increment_online_count(by: -1)
  end
end
