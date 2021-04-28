import React from 'react';
import ResultsTable from './';
import { DateTime } from 'luxon';
import range from 'lodash/range';
import VALUES from '../../constants/values';

const data = range(8).map((i) => ({
  date: DateTime.now().minus({ weeks: i * 2 }),
  datapoints: Object.keys(VALUES).reduce(
    (result, value) => ({
      ...result,
      [value]: Math.random() * 2 - 1,
    }),
    {}
  ),
}));

export default <ResultsTable data={data} />;
