import type { GetPrefecturesResponse } from '@/interfaces/prefectures';

interface Props {
  PrefecturesData: GetPrefecturesResponse;
}

export const Selector = ({ PrefecturesData }: Props) => {
  return (
    <>
      {PrefecturesData.result.map((item) => {
        return (
          <label key={item.prefCode}>
            <input type="checkbox" value={item.prefCode} />
            {item.prefName}
          </label>
        );
      })}
    </>
  );
};
