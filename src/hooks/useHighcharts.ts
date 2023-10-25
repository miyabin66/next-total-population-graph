import { useMemo } from 'react';
import type { PopulationGraphData } from '@/interfaces/population';
import type { DisplayConditions } from '@/interfaces/prefectures';

interface Props {
  checkedPrefectures: string[];
  displayCondition: DisplayConditions;
  graphData: PopulationGraphData[] | undefined;
}

const DEFAULT_OPTIONS = {
  title: {
    text: 'グラフ',
  },
  series: [],
};

export const useHighcharts = ({
  checkedPrefectures,
  displayCondition,
  graphData,
}: Props) => {
  const checkedData = useMemo(() => {
    if (!graphData) return [];

    return graphData.filter((item) => {
      return checkedPrefectures.includes(item.prefName);
    });
  }, [checkedPrefectures, graphData]);

  const conditionData = useMemo(() => {
    if (checkedData.length === 0) return [];

    return checkedData.map((item) => {
      return item.result.data.filter(
        (data) => data.label === displayCondition,
      )[0];
    });
  }, [checkedData, displayCondition]);

  const options = useMemo(() => {
    if (conditionData.length === 0) {
      return DEFAULT_OPTIONS;
    }

    const year = conditionData[0].data.map((dataItem) => dataItem.year);
    const series = conditionData.map((listItem, i) => {
      return {
        data: listItem.data.map((dataItem) => {
          return dataItem.value;
        }),
        name: checkedData[i].prefName,
      };
    });

    return {
      ...DEFAULT_OPTIONS,
      xAxis: {
        title: {
          text: '年度',
        },
        categories: year,
      },
      yAxis: {
        title: {
          text: conditionData[0].label,
        },
      },
      series,
    };
  }, [checkedData, conditionData]);

  return { options };
};
