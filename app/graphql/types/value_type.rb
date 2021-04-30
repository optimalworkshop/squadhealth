module Types
  class ValueType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :good, String, null: false
    field :bad, String, null: false
  end
end
