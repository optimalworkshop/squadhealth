module Subscriptions
  class VoteReceived < BaseSubscription
    argument :id, ID, required: true
    null true

    payload_type Types::VoteType

    def subscribe(*)
      nil
    end
  end
end
