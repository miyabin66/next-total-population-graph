import {
  DisplayConditionsList,
  type DisplayConditions,
  type GetPrefecturesResponse,
} from '@/interfaces/prefectures';
import type { MouseEventHandler } from 'react';

interface Props {
  PrefecturesData: GetPrefecturesResponse;
  displayCondition: DisplayConditions;
  changeDisplayCondition: MouseEventHandler<HTMLInputElement>;
}

export const Selector = ({
  PrefecturesData,
  displayCondition,
  changeDisplayCondition,
}: Props) => {
  return (
    <>
      <div>
        {PrefecturesData.result.map((item) => {
          return (
            <label key={item.prefCode}>
              <input type="checkbox" value={item.prefCode} />
              {item.prefName}
            </label>
          );
        })}
      </div>
      <div>
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
    </>
  );
};
