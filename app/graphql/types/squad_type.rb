module Types
  class SquadType < Types::BaseObject
    field :id, ID, null: false
    field :health_checks, [HealthCheckType], null: false
    field :current_health_check, HealthCheckType, null: true

    def id
      object.to_param
    end

    def health_checks
      Loaders::ForeignKeyLoader.for(HealthCheck, foreign_key: :squad_id).load(object.id)
    end

    def current_health_check
      Loaders::ForeignKeyLoader
        .for(HealthCheck.current.limit(1), foreign_key: :squad_id)
        .load(object.id)
        .then(&:first)
    end
  end
end
