'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { useHighcharts } from '@/hooks/useHighcharts';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import type {
  DisplayConditions,
  PrefecturesList,
} from '@/interfaces/prefectures';
import type { PopulationGraphData } from '@/interfaces/population';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

interface Props {
  displayCondition: DisplayConditions;
  currentPrefectures: PrefecturesList;
  graphData: PopulationGraphData[] | undefined;
  setGraphData: Dispatch<SetStateAction<PopulationGraphData[] | undefined>>;
}

export const Graph = ({
  displayCondition,
  currentPrefectures,
  graphData,
  setGraphData,
}: Props) => {
  const { populationData } = usePopulation({
    prefCode: currentPrefectures.prefCode,
  });
  const { options } = useHighcharts({
    displayCondition,
    graphData,
  });

  useEffect(() => {
    if (!populationData) return;

    const data = populationData.result;

    setGraphData((prev) => {
      if (!prev) {
        return [{ result: data, prefName: currentPrefectures.prefName }];
      }

      const exsistData = prev.filter(
        (item) => item.prefName === currentPrefectures.prefName,
      );

      if (exsistData.length === 0) {
        return [
          ...prev,
          { result: data, prefName: currentPrefectures.prefName },
        ];
      }

      return prev;
    });
  }, [currentPrefectures, populationData, setGraphData]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
