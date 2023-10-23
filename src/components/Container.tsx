'use client';
import { Graph } from './Graph';
import { Selector } from './Selector';
import type { GetPrefecturesResponse } from '@/interfaces/prefectures';

interface Props {
  PrefecturesData: GetPrefecturesResponse;
}

export const Contaier = ({ PrefecturesData }: Props) => {
  return (
    <>
      <Selector PrefecturesData={PrefecturesData} />
      <Graph />
    </>
  );
};
