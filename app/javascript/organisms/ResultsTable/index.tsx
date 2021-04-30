import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import upperFirst from 'lodash/upperFirst';
import VALUES from '../../constants/values';
import * as ICONS from '../../atoms/Icon';
import Face from '../../atoms/Face';

type ValueKey = keyof typeof VALUES;

export type HealthCheckData = {
  date: DateTime;
  datapoints: { [_key in ValueKey]: number };
};

interface Props {
  data: HealthCheckData[];
}

const Icon = ({ name }: { name: ValueKey }) => {
  const Component = ICONS[upperFirst(name)];
  return <Component />;
};

const ResultsTable: React.FC<Props> = ({ data }) => {
  const keys: ValueKey[] = useMemo(
    () =>
      Array.from(
        data.reduce(
          (result, date) =>
            Object.keys(date.datapoints).reduce(
              (set, key) => set.add(key),
              result
            ),
          new Set<ValueKey>()
        )
      ),
    [data]
  );

  return (
    <div className="results-table">
      <table>
        <thead>
          <tr>
            <th></th>
            {data.map((d) => (
              <th key={d.date.valueOf()}>
                <b>{d.date.toFormat('d MMM')}</b> {d.date.toFormat('yyyy')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key}>
              <th>
                <div className="labelled-icon">
                  <Icon name={key} />
                  <span>{VALUES[key].name}</span>
                </div>
              </th>
              {data.map((d) => (
                <td key={d.date.valueOf()}>
                  <Face value={d.datapoints[key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
