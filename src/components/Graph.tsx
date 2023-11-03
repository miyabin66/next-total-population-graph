'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { useHighcharts } from '@/hooks/useHighcharts';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import type {
  DisplayConditions,
  PrefecturesList,
} from '@/interfaces/prefectures';
import type { PopulationGraphData } from '@/interfaces/population';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsAccessibility(Highcharts);
}

interface Props {
  displayCondition: DisplayConditions;
  currentPrefectures: PrefecturesList;
  graphData: PopulationGraphData[] | undefined;
  setGraphData: Dispatch<SetStateAction<PopulationGraphData[] | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const Graph = ({
  displayCondition,
  currentPrefectures,
  graphData,
  setGraphData,
  setIsLoading,
}: Props) => {
  const { populationData, isLoading } = usePopulation({
    prefCode: currentPrefectures.prefCode,
  });
  const { options } = useHighcharts({
    displayCondition,
    graphData,
  });

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading]);

  useEffect(() => {
    if (!populationData) return;

    const data = populationData.result;
    const prefName = currentPrefectures.prefName;

    setGraphData((prev) => {
      if (!prev) {
        return [{ result: data, prefName }];
      }

      const exsistData = prev.filter((item) => item.prefName === prefName);

      if (exsistData.length === 0) {
        return [...prev, { result: data, prefName }];
      }

      return prev;
    });
  }, [currentPrefectures, populationData, setGraphData]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
