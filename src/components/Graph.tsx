'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import { throwError } from '@/lib/throwError';
import { useEffect } from 'react';

export const Graph = () => {
  const { populationData, mutatePopulation } = usePopulation({ prefCode: 11 });

  useEffect(() => {
    mutatePopulation().catch((e) => throwError(e));
  }, [mutatePopulation]);

  return <p>{`${populationData?.message}`}</p>;
};
