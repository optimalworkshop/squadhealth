module Types
  class HealthCheckType < Types::BaseObject
    field :id, ID, null: false
    field :squad_id, Integer, null: false
    field :started_at, GraphQL::Types::ISO8601DateTime, null: true
    field :ended_at, GraphQL::Types::ISO8601DateTime, null: true
    field :current, Boolean, null: false
    field :values, [ValueType], null: false do
      argument :randomise, Boolean, required: false, default_value: false
    end
    field :votes, [VoteType], null: false do
      argument :for, ID, required: false, default_value: nil, as: :person_id
    end

    def id
      object.to_param
    end

    def current
      object.current?
    end

    def values(randomise:)
      ::Value.all.dup.tap do |values|
        values.shuffle!(random: randomiser) if randomise
      end
    end

    def votes(person_id:)
      scope = person_id ? Person.find(person_id).votes : Vote
      Loaders::ForeignKeyLoader.for(scope, foreign_key: :health_check_id).load(object.id)
    end

    private

    def randomiser
      @randomiser ||= Random.new([object.id, context[:identity]&.id].inspect.hash)
    end
  end
end
