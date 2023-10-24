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
  const [prefCode, setPrefCode] = useState<number>();
  const [displayCondition, setDisplayCondition] =
    useState<DisplayConditions>('総人口');

  const changePrefectures: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.currentTarget.checked) return;
      setPrefCode(Number(e.currentTarget.value));
    },
    [],
  );

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
        changePrefectures={changePrefectures}
      />
      {prefCode !== undefined && (
        <Graph displayCondition={displayCondition} prefCode={prefCode} />
      )}
    </>
  );
};
