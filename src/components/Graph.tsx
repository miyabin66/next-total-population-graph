'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { useHighcharts } from '@/hooks/useHighcharts';
import { useGrpph } from '@/hooks/useGraph';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { type Dispatch, type SetStateAction } from 'react';
import type {
  DisplayConditions,
  PrefecturesList,
} from '@/interfaces/prefectures';
import type { PopulationGraphData } from '@/interfaces/population';

if (typeof Highcharts === 'object') {
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
  useGrpph({
    currentPrefectures,
    isLoading,
    populationData,
    setGraphData,
    setIsLoading,
  });

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
