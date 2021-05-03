export type Value = {
  id: string;
  name: string;
  good: string;
  bad: string;
};

export type Vote = {
  value: string;
  score: number;
};

export type HealthCheck = {
  id: string;
  values?: Value[];
  votes?: Vote[];
  startedAt: string;
};

export type Squad = {
  id: string;
  currentHealthCheck?: HealthCheck;
  healthChecks?: HealthCheck[];
};
