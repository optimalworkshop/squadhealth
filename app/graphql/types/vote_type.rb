module Types
  class VoteType < BaseObject
    field :value, String, null: false
    field :score, Int, null: false
  end
end
