import { useMemo } from 'react';
import type { PopulationGraphData } from '@/interfaces/population';
import type { DisplayConditions } from '@/interfaces/prefectures';

interface Props {
  displayCondition: DisplayConditions;
  graphData: PopulationGraphData[] | undefined;
}

export const useHighcharts = ({ displayCondition, graphData }: Props) => {
  const options = useMemo(() => {
    if (!graphData) return {};

    const list = graphData.map((item) => {
      return item.result.data.filter(
        (data) => data.label === displayCondition,
      )[0];
    });
    const year = list[0].data.map((dataItem) => dataItem.year);
    const series = list.map((listItem, i) => {
      return {
        data: listItem.data.map((dataItem) => {
          return dataItem.value;
        }),
        name: graphData[i].prefName,
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
