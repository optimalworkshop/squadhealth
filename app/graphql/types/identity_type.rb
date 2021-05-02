module Types
  class IdentityType < BaseObject
    field :id, ID, null: false

    def id
      object.to_param
    end
  end
end
