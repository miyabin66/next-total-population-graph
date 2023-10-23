'use client';
import { Graph } from './Graph';
import { Selector } from './Selector';
import { useCallback, useState } from 'react';
import type { MouseEventHandler } from 'react';
import type {
  DisplayConditions,
  GetPrefecturesResponse,
} from '@/interfaces/prefectures';

interface Props {
  PrefecturesData: GetPrefecturesResponse;
}

export const Contaier = ({ PrefecturesData }: Props) => {
  const [displayCondition, setDisplayCondition] =
    useState<DisplayConditions>('総人口');

  const changeDisplayCondition: MouseEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setDisplayCondition(e.currentTarget.value as DisplayConditions);
    }, []);

  return (
    <>
      <Selector
        PrefecturesData={PrefecturesData}
        displayCondition={displayCondition}
        changeDisplayCondition={changeDisplayCondition}
      />
      <Graph displayCondition={displayCondition} />
    </>
  );
};
