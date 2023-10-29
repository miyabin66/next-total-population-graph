import { Input } from './Input';
import {
  DisplayConditionsList,
  type DisplayConditions,
  type GetPrefecturesData,
} from '@/interfaces/prefectures';
import styles from '@/styles/components/selector.module.scss';
import type { MouseEventHandler } from 'react';

interface Props {
  prefecturesData: GetPrefecturesData;
  displayCondition: DisplayConditions;
  changeDisplayCondition: MouseEventHandler<HTMLInputElement>;
  changePrefectures: MouseEventHandler<HTMLInputElement>;
}

export const Selector = ({
  prefecturesData,
  displayCondition,
  changeDisplayCondition,
  changePrefectures,
}: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.flexWrapper}>
        {prefecturesData.result.map((item) => {
          return (
            <Input
              key={item.prefCode}
              type={'checkbox'}
              id={item.prefCode.toString()}
              value={item.prefName}
              onClick={changePrefectures}
              className={styles.label}
            />
          );
        })}
      </div>
      <h2 className={styles.title}>条件指定</h2>
      <div className={styles.flexWrapper}>
        {Object.values(DisplayConditionsList).map((value) => {
          return (
            <Input
              key={value}
              type={'radio'}
              value={value}
              name={'display_conditions'}
              onClick={changeDisplayCondition}
              checked={displayCondition === value}
            />
          );
        })}
      </div>
    </div>
  );
};
