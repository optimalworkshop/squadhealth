module Types
  class MutationType < Types::BaseObject
    field :create_squad, mutation: Mutations::CreateSquad
    field :start_session, mutation: Mutations::StartSession
    field :record_vote, mutation: Mutations::RecordVote
  end
end
