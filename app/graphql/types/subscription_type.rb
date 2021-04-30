module Types
  class SubscriptionType < Types::BaseObject
    field :squad_status, subscription: Subscriptions::SquadStatus
  end
end
