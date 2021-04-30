module Types
  class HealthCheckType < Types::BaseObject
    field :id, ID, null: false
    field :squad_id, Integer, null: false
    field :started_at, GraphQL::Types::ISO8601DateTime, null: true
    field :ended_at, GraphQL::Types::ISO8601DateTime, null: true
    field :current, Boolean, null: false
    field :values, [ValueType], null: false

    def id
      object.to_param
    end

    def current
      object.current?
    end

    def values
      ::Value.all
    end
  end
end
