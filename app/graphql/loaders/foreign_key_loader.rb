module Loaders
  class ForeignKeyLoader < GraphQL::Batch::Loader
    attr_reader :model, :foreign_key

    def initialize(model, foreign_key:)
      super()
      @model = model
      @foreign_key = foreign_key
    end

    def perform(ids)
      model.where(foreign_key => ids).group_by(&foreign_key).each do |id, records|
        fulfill(id, records)
      end
      ids.each { |id| fulfill(id, []) unless fulfilled?(id) }
    end
  end
end
