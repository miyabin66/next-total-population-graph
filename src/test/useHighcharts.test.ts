import { useHighcharts } from '@/hooks/useHighcharts';
import { DisplayConditionsList } from '@/interfaces/prefectures';
import { POPULATION_GRAPH_DATA } from '@/mock/populationData';
import { cleanup, renderHook } from '@testing-library/react';

describe('useHighchartsのテスト', () => {
  beforeEach(() => {
    cleanup();
  });

  test('都道府県を北海道、条件に総人口を選択する', () => {
    const { result } = renderHook(() =>
      useHighcharts({
        displayCondition: DisplayConditionsList['総人口'],
        graphData: POPULATION_GRAPH_DATA,
      }),
    );

    const options = result.current.options;

    if (options.series) {
      expect(options.series[0].name).toBe('北海道');
    }
    expect(options.title.text).toBe('総人口グラフ');
  });

  test('都道府県を北海道、条件に総人口を選択した後で条件を年少人口に変更する', () => {
    const { result } = renderHook(() =>
      useHighcharts({
        displayCondition: DisplayConditionsList['年少人口'],
        graphData: POPULATION_GRAPH_DATA,
      }),
    );

    const options = result.current.options;

    expect(options.title.text).toBe('年少人口グラフ');
  });
});
