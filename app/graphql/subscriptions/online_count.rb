module Subscriptions
  class OnlineCount < BaseSubscription
    argument :id, ID, required: true

    payload_type Integer

    def subscribe(id:)
      Squad.find(id).online_count
    end
  end
end
