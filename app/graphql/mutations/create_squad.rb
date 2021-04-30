module Mutations
  class CreateSquad < BaseMutation
    payload_type Types::SquadType

    def resolve
      Squad.create!
    end
  end
end
