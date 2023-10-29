import { useDataSelector } from '@/hooks/useDataSelector';
import { DisplayConditionsList } from '@/interfaces/prefectures';
import { act, cleanup, renderHook } from '@testing-library/react';
import type { MouseEvent } from 'react';

describe('changeDisplayConditionのテスト', () => {
  beforeEach(() => {
    cleanup();
  });

  test('ページアクセス後年少人口を選択した場合', () => {
    const { result } = renderHook(() => useDataSelector());

    expect(result.current.displayCondition).toBe(
      DisplayConditionsList['総人口'],
    );

    act(() => {
      result.current.changeDisplayCondition({
        currentTarget: { value: DisplayConditionsList['年少人口'] },
      } as MouseEvent<HTMLInputElement>);
    });

    expect(result.current.displayCondition).toBe(
      DisplayConditionsList['年少人口'],
    );
  });
});
