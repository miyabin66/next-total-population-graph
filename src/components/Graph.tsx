'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { throwError } from '@/lib/throwError';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useMemo } from 'react';
import type { DisplayConditions } from '@/interfaces/prefectures';

interface Props {
  displayCondition: DisplayConditions;
}

export const Graph = ({ displayCondition }: Props) => {
  const { populationData, mutatePopulation, isLoading } = usePopulation({
    prefCode: 11,
  });

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }

  useEffect(() => {
    mutatePopulation().catch((e) => throwError(e));
  }, [mutatePopulation]);

  const options = useMemo(() => {
    const list = populationData?.result.data.filter(
      (data) => data.label === displayCondition,
    )[0];
    const year = list?.data.map((item) => item.year);
    const value = list?.data.map((item) => item.value);

    return {
      title: {
        text: 'グラフ',
      },
      xAxis: {
        title: {
          text: '年度',
        },
        categories: year,
      },
      yAxis: {
        title: {
          text: list?.label,
        },
      },
      series: [
        {
          data: value,
        },
      ],
    };
  }, [displayCondition, populationData]);

  if (isLoading) return <></>;

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
