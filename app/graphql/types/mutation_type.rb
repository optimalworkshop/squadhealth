module Types
  class MutationType < Types::BaseObject
    field :create_squad, Types::SquadType, null: false

    def create_squad
      Squad.create!
    end
  end
end
