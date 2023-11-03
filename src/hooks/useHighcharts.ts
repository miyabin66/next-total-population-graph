import { useMemo } from 'react';
import type { PopulationGraphData } from '@/interfaces/population';
import type { DisplayConditions } from '@/interfaces/prefectures';

interface Props {
  displayCondition: DisplayConditions;
  graphData: PopulationGraphData[] | undefined;
}

export const useHighcharts = ({ displayCondition, graphData }: Props) => {
  const defaultOptions = useMemo(() => {
    return {
      title: {
        text: `${displayCondition}グラフ`,
      },
      series: [],
      accessibility: {
        enabled: false,
      },
    };
  }, [displayCondition]);

  const conditionData = useMemo(() => {
    if (!graphData || graphData.length === 0) return [];

    return graphData.map((item) => {
      return item.result.data.filter(
        (data) => data.label === displayCondition,
      )[0];
    });
  }, [graphData, displayCondition]);

  const options = useMemo(() => {
    if (!graphData || conditionData.length === 0) {
      return defaultOptions;
    }

    const years = conditionData[0].data.map((dataItem) => dataItem.year);
    const series = conditionData.map((listItem, i) => {
      return {
        data: listItem.data.map((dataItem) => {
          return dataItem.value;
        }),
        name: graphData[i].prefName,
      };
    });

    return {
      ...defaultOptions,
      xAxis: {
        title: {
          text: '年度',
        },
        categories: years,
      },
      yAxis: {
        title: {
          text: conditionData[0].label,
        },
      },
      series,
    };
  }, [conditionData, defaultOptions, graphData]);

  return { options };
};
