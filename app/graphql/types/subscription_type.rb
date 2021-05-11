module Types
  class SubscriptionType < Types::BaseObject
    field :squad_status, subscription: Subscriptions::SquadStatus
    field :vote_received, subscription: Subscriptions::VoteReceived
    field :online_count, subscription: Subscriptions::OnlineCount
  end
end
