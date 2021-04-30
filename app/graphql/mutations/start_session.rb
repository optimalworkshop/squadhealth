module Mutations
  class StartSession < BaseMutation
    argument :id, ID, required: true

    payload_type Types::HealthCheckType

    def resolve(id:)
      squad = Squad.find(id)
      squad.health_checks.create!.tap do
        SquadhealthSchema.subscriptions.trigger(:squad_status, { id: squad.to_param }, squad.reload)
      end
    end
  end
end
