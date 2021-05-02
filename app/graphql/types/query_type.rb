module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :squad, Types::SquadType, null: false do
      argument :id, ID, required: true
    end

    def squad(id:)
      Squad.find(id)
    end

    field :identity, Types::IdentityType, null: true

    def identity
      context[:identity]
    end
  end
end
