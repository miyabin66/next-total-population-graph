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
            <label key={item.prefCode} className={styles.label}>
              <input
                type="checkbox"
                id={item.prefCode.toString()}
                value={item.prefName}
                onClick={changePrefectures}
              />
              {item.prefName}
            </label>
          );
        })}
      </div>
      <h2 className={styles.title}>条件指定</h2>
      <div className={styles.flexWrapper}>
        {Object.values(DisplayConditionsList).map((value) => {
          return (
            <label key={value}>
              <input
                type="radio"
                name="display_conditions"
                value={value}
                onClick={changeDisplayCondition}
                defaultChecked={displayCondition === value}
              />
              {value}
            </label>
          );
        })}
      </div>
    </div>
  );
};
