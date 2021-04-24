module Types
  class HealthCheckType < Types::BaseObject
    field :id, ID, null: false
    field :squad_id, Integer, null: false
    field :started_at, GraphQL::Types::ISO8601DateTime, null: true
    field :ended_at, GraphQL::Types::ISO8601DateTime, null: true
    field :current, Boolean, null: false

    def current
      object.current?
    end
  end
end
