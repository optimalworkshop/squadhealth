module Mutations
  class RecordVote < BaseMutation
    argument :squad_id, GraphQL::Types::ID, required: true
    argument :value, String, required: true
    argument :score, Integer, required: true

    payload_type Types::VoteType

    def resolve(squad_id:, **args)
      squad = Squad.find(squad_id)
      health_check = squad.health_checks.current.first

      health_check && identity && create_vote(health_check, person: identity, **args)
    end

    private

    def create_vote(health_check, **attrs)
      health_check.votes.create!(attrs).tap do |vote|
        SquadhealthSchema.subscriptions.trigger(
          :vote_received,
          { id: health_check.squad.to_param },
          vote
        )
      end
    end
  end
end
