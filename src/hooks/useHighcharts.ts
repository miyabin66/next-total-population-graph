import { useMemo } from 'react';
import type { PopulationGraphData } from '@/interfaces/population';
import type { DisplayConditions } from '@/interfaces/prefectures';

interface Props {
  displayCondition: DisplayConditions;
  graphData: PopulationGraphData[] | undefined;
}

const DEFAULT_OPTIONS = {
  title: {
    text: '人口構成グラフ',
  },
  series: [],
};

export const useHighcharts = ({ displayCondition, graphData }: Props) => {
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
      return DEFAULT_OPTIONS;
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
      ...DEFAULT_OPTIONS,
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
  }, [conditionData, graphData]);

  return { options };
};
