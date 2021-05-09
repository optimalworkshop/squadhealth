module Mutations
  class StartSession < BaseMutation
    argument :id, ID, required: true
    argument :time, Integer, required: false

    payload_type Types::HealthCheckType

    def resolve(id:, time: nil)
      squad = Squad.find(id)
      health_check = squad.health_checks.create!(
        started_at: Time.current,
        ended_at: time&.seconds&.from_now
      )
      SquadhealthSchema.subscriptions.trigger(:squad_status, { id: squad.to_param }, squad.reload)
      health_check
    end
  end
end
