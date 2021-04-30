module Subscriptions
  class SquadStatus < BaseSubscription
    argument :id, ID, required: true

    payload_type Types::SquadType

    def subscribe(id:)
      Squad.find(id)
    end
  end
end
