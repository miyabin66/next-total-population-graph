'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { useHighcharts } from '@/hooks/useHighcharts';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import type {
  DisplayConditions,
  PrefecturesList,
} from '@/interfaces/prefectures';
import type { PopulationGraphData } from '@/interfaces/population';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

interface Props {
  checkedPrefectures: string[];
  displayCondition: DisplayConditions;
  currentPrefectures: PrefecturesList;
}

export const Graph = ({
  checkedPrefectures,
  displayCondition,
  currentPrefectures,
}: Props) => {
  const [graphData, setGraphData] = useState<PopulationGraphData[]>();
  const { populationData } = usePopulation({
    prefCode: currentPrefectures.prefCode,
  });
  const { options } = useHighcharts({
    checkedPrefectures,
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
  }, [currentPrefectures, populationData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
