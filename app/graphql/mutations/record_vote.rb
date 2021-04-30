module Mutations
  class RecordVote < BaseMutation
    argument :squad_id, GraphQL::Types::ID, required: true
    argument :value, String, required: true
    argument :score, Integer, required: true

    payload_type Boolean

    def resolve(squad_id:, **args)
      squad = squad.find(squad_id)
      health_check = squad.health_checks.current.first

      if health_check
        health_check.votes.create!(args)
        true
      else
        false
      end
    end
  end
end
