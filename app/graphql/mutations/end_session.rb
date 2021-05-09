module Mutations
  class EndSession < BaseMutation
    argument :id, ID, required: true

    payload_type Types::HealthCheckType

    def resolve(id:)
      squad = Squad.find(id)
      squad.health_checks.current.last&.tap do |health_check|
        health_check.end!
        SquadhealthSchema.subscriptions.trigger(:squad_status, { id: squad.to_param }, squad.reload)
      end
    end
  end
end
