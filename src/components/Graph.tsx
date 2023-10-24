'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { useHighcharts } from '@/hooks/useHighcharts';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import type { DisplayConditions } from '@/interfaces/prefectures';
import type { PopulationResult } from '@/interfaces/population';

interface Props {
  displayCondition: DisplayConditions;
  prefCode: number;
}

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

export const Graph = ({ displayCondition, prefCode }: Props) => {
  const [graphData, setGraphData] = useState<PopulationResult[]>();
  const { populationData } = usePopulation({
    prefCode,
  });
  const { options } = useHighcharts({ displayCondition, graphData });

  useEffect(() => {
    if (!populationData) return;

    const data = populationData.result;

    setGraphData((prev) => {
      if (!prev) {
        return [data];
      }

      const exsistData = prev.filter((item) => item === data);

      if (exsistData.length === 0) {
        return [...prev, data];
      }

      return prev;
    });
  }, [populationData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
