import { fetcher } from './fetcher';
import { throwError } from '@/lib/throwError';
import useSWR from 'swr';
import type { GetPopulationResponse } from '@/interfaces/population';

interface Props {
  prefCode: number | undefined;
}

export const usePopulation = ({ prefCode }: Props) => {
  const urlSearchParam = new URLSearchParams({
    prefCode: prefCode?.toString() || '',
  }).toString();

  const { data, isLoading, error } = useSWR<
    {
      data: GetPopulationResponse;
    },
    Error
  >(
    prefCode ? `/population/composition/perYear?${urlSearchParam}` : null,
    fetcher,
  );

  if (error) {
    throwError(error);
  }

  return { populationData: data?.data, isLoading };
};
