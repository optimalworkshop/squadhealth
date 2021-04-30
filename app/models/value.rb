class Value
  attr_reader :id, :name, :good, :bad

  def initialize(id:, name:, good:, bad:)
    @id = id
    @name = name
    @good = good
    @bad = bad
  end

  def self.indexed
    @indexed ||=
      YAML
      .load_file(Rails.root.join('config/values.yml'))
      .map { |record| new(**record.symbolize_keys) }
      .index_by(&:id)
  end

  def self.all
    indexed.values
  end
end
