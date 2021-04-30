class HealthCheck < ApplicationRecord
  include Hashid::Rails

  belongs_to :squad

  validates :squad_id, :started_at, presence: true

  scope :most_recent_first, -> { order(started_at: :desc) }

  default_scope { most_recent_first }

  before_validation :populate_started_at

  before_create :end_previous

  def self.current
    where('started_at <= :now AND (ended_at IS NULL OR ended_at > :now)', now: Time.current)
  end

  def self.current!
    current || create!
  end

  def current?
    started_at <= Time.current && (!ended_at? || ended_at > Time.current)
  end

  def end!
    update!(ended_at: Time.current)
  end

  private

  def populate_started_at
    self.started_at ||= Time.current
  end

  def end_previous
    self.class.current.where.not(id: id).find_each(&:end!)
  end
end
