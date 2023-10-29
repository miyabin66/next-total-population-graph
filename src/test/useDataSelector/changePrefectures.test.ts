import { useDataSelector } from '@/hooks/useDataSelector';
import { POPULATION_DATA } from '@/mock/populationData';
import { act, cleanup, renderHook } from '@testing-library/react';
import type { MouseEvent } from 'react';

describe('changePrefecturesのテスト', () => {
  beforeEach(() => {
    cleanup();
  });

  test('ページアクセス時に北海道を選択', () => {
    const { result } = renderHook(() => useDataSelector());

    expect(result.current.currentPrefectures).toBe(undefined);

    act(() => {
      result.current.changePrefectures({
        currentTarget: { value: '北海道', id: '1', checked: true },
      } as MouseEvent<HTMLInputElement>);
    });

    expect(result.current.currentPrefectures).toStrictEqual({
      prefCode: 1,
      prefName: '北海道',
    });
  });

  test('北海道を選択後、青森を選択', () => {
    const { result } = renderHook(() => useDataSelector());

    expect(result.current.graphData).toBe(undefined);
    expect(result.current.currentPrefectures).toBe(undefined);

    act(() => {
      result.current.changePrefectures({
        currentTarget: { value: '北海道', id: '1', checked: true },
      } as MouseEvent<HTMLInputElement>);
    });

    expect(result.current.currentPrefectures).toStrictEqual({
      prefCode: 1,
      prefName: '北海道',
    });

    act(() => {
      result.current.changePrefectures({
        currentTarget: { value: '青森', id: '2', checked: true },
      } as MouseEvent<HTMLInputElement>);
    });

    expect(result.current.currentPrefectures).toStrictEqual({
      prefCode: 2,
      prefName: '青森',
    });
  });

  test('北海道を選択後、北海道を削除', () => {
    const { result } = renderHook(() => useDataSelector());

    expect(result.current.graphData).toBe(undefined);
    expect(result.current.currentPrefectures).toBe(undefined);

    act(() => {
      result.current.changePrefectures({
        currentTarget: { value: '北海道', id: '1', checked: true },
      } as MouseEvent<HTMLInputElement>);
      result.current.setGraphData(POPULATION_DATA);
    });

    expect(result.current.currentPrefectures).toStrictEqual({
      prefCode: 1,
      prefName: '北海道',
    });

    act(() => {
      result.current.changePrefectures({
        currentTarget: { value: '北海道', id: '1', checked: false },
      } as MouseEvent<HTMLInputElement>);
    });

    expect(result.current.currentPrefectures).toStrictEqual({
      prefCode: 1,
      prefName: '北海道',
    });
    expect(result.current.graphData).toStrictEqual([]);
  });
});
