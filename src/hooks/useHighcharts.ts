import { useMemo } from 'react';
import type { PopulationResult } from '@/interfaces/population';
import type { DisplayConditions } from '@/interfaces/prefectures';

interface Props {
  displayCondition: DisplayConditions;
  graphData: PopulationResult[] | undefined;
}

export const useHighcharts = ({ displayCondition, graphData }: Props) => {
  const options = useMemo(() => {
    if (!graphData) return {};

    const list = graphData.map((item) => {
      return item.data.filter((data) => data.label === displayCondition)[0];
    });
    const year = list[0].data.map((dataItem) => {
      dataItem.year;
    });
    const series = list.map((listItem) => {
      return {
        data: listItem.data.map((dataItem) => {
          return dataItem.value;
        }),
      };
    });

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
          text: list[0].label,
        },
      },
      series,
    };
  }, [displayCondition, graphData]);

  return { options };
};
