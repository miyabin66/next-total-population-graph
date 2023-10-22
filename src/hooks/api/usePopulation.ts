import { fetcher } from './fetcher';
import useSWR from 'swr';
import type { GetPopulationResponse } from '@/interfaces/population';

interface Props {
  prefCode: number | undefined;
}

export const usePopulation = ({ prefCode }: Props) => {
  const urlSearchParam = new URLSearchParams({
    prefCode: prefCode?.toString() || '',
  }).toString();

  const { data: populationData, mutate: mutatePopulation } =
    useSWR<GetPopulationResponse>(
      prefCode ? `/population/composition/perYear?${urlSearchParam}` : null,
      fetcher,
    );

  return { populationData, mutatePopulation };
};
