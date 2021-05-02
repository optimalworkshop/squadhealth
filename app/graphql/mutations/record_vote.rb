module Mutations
  class RecordVote < BaseMutation
    argument :squad_id, GraphQL::Types::ID, required: true
    argument :value, String, required: true
    argument :score, Integer, required: true

    payload_type Types::VoteType

    def resolve(squad_id:, **args)
      squad = Squad.find(squad_id)
      health_check = squad.health_checks.current.first

      health_check && identity && health_check.votes.create!(person: identity, **args)
    end
  end
end
