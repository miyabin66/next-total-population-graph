import { useState, type MouseEventHandler, useCallback } from 'react';
import type {
  PrefecturesList,
  DisplayConditions,
} from '@/interfaces/prefectures';
import type { PopulationGraphData } from '@/interfaces/population';

export const useDataSelector = () => {
  const [currentPrefectures, setCurrentPrefectures] =
    useState<PrefecturesList>();
  const [displayCondition, setDisplayCondition] =
    useState<DisplayConditions>('総人口');
  const [graphData, setGraphData] = useState<PopulationGraphData[]>();

  const changePrefectures: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const currentValue = e.currentTarget.value;
      if (!e.currentTarget.checked) {
        setGraphData(
          (prev) =>
            prev && prev.filter((item) => item.prefName !== currentValue),
        );
        return;
      }
      setCurrentPrefectures({
        prefCode: Number(e.currentTarget.id),
        prefName: currentValue,
      });
    },
    [],
  );

  const changeDisplayCondition: MouseEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setDisplayCondition(e.currentTarget.value as DisplayConditions);
    }, []);

  return {
    currentPrefectures,
    displayCondition,
    graphData,
    changePrefectures,
    changeDisplayCondition,
    setGraphData,
  };
};
