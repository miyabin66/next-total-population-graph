import { useEffect, type Dispatch, type SetStateAction } from 'react';
import type { PrefecturesList } from '@/interfaces/prefectures';
import type {
  GetPopulationResponse,
  PopulationGraphData,
} from '@/interfaces/population';

interface Props {
  currentPrefectures: PrefecturesList;
  isLoading: boolean;
  populationData: GetPopulationResponse | undefined;
  setGraphData: Dispatch<SetStateAction<PopulationGraphData[] | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const useGrpph = ({
  currentPrefectures,
  isLoading,
  populationData,
  setGraphData,
  setIsLoading,
}: Props) => {
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

  return {};
};
