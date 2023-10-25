'use client';
import { Graph } from './Graph';
import { Selector } from './Selector';
import { useCallback, useState } from 'react';
import type { MouseEventHandler } from 'react';
import type {
  DisplayConditions,
  GetPrefecturesResponse,
  PrefecturesList,
} from '@/interfaces/prefectures';

interface Props {
  PrefecturesData: GetPrefecturesResponse;
}

export const Contaier = ({ PrefecturesData }: Props) => {
  const [currentPrefectures, setCurrentPrefectures] =
    useState<PrefecturesList>();
  const [checkedPrefectures, setCheckedPrefectures] = useState<string[]>([]);
  const [displayCondition, setDisplayCondition] =
    useState<DisplayConditions>('総人口');

  const changePrefectures: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const currentValue = e.currentTarget.value;
      if (!e.currentTarget.checked) {
        setCheckedPrefectures((prev) =>
          prev.filter((item) => !item.includes(currentValue)),
        );
        return;
      }
      setCheckedPrefectures((prev) => {
        const currentArray = [...prev, currentValue];
        return [...new Set(currentArray)];
      });
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

  return (
    <>
      <Selector
        PrefecturesData={PrefecturesData}
        displayCondition={displayCondition}
        changeDisplayCondition={changeDisplayCondition}
        changePrefectures={changePrefectures}
      />
      {currentPrefectures !== undefined && (
        <Graph
          checkedPrefectures={checkedPrefectures}
          displayCondition={displayCondition}
          currentPrefectures={currentPrefectures}
        />
      )}
    </>
  );
};
