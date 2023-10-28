'use client';
import { Graph } from './Graph';
import { Selector } from './Selector';
import styles from '@/styles/components/container.module.scss';
import { useCallback, useState } from 'react';
import type { MouseEventHandler } from 'react';
import type {
  DisplayConditions,
  GetPrefecturesData,
  PrefecturesList,
} from '@/interfaces/prefectures';

interface Props {
  prefecturesData: GetPrefecturesData;
}

export const Contaier = ({ prefecturesData }: Props) => {
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
    <section className={styles.container}>
      <h1 className={styles.title}>都道府県人口データグラフ</h1>
      <div className={styles.wrapperSelector}>
        <Selector
          prefecturesData={prefecturesData}
          displayCondition={displayCondition}
          changeDisplayCondition={changeDisplayCondition}
          changePrefectures={changePrefectures}
        />
      </div>
      {currentPrefectures !== undefined && (
        <Graph
          checkedPrefectures={checkedPrefectures}
          displayCondition={displayCondition}
          currentPrefectures={currentPrefectures}
        />
      )}
    </section>
  );
};
