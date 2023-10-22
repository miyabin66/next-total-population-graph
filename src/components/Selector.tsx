import { BASE_URL } from '@/env';
import { throwError } from '@/lib/throwError';
import type { GetPrefecturesResponse } from '@/interfaces/prefectures';

export const Selector = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/prefectures`);
    const data = (await res.json()) as GetPrefecturesResponse;

    return (
      <>
        {data.result.map((item) => {
          return (
            <label key={item.prefCode}>
              <input type="checkbox" value={item.prefCode} />
              {item.prefName}
            </label>
          );
        })}
      </>
    );
  } catch (e) {
    throwError(e);
  }
};
