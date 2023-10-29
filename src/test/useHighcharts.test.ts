import { useHighcharts } from '@/hooks/useHighcharts';
import { DisplayConditionsList } from '@/interfaces/prefectures';
import { OPTIONS_SERIES } from '@/mock/highChartsData';
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

    expect(result.current.options.series).toStrictEqual(OPTIONS_SERIES);
  });
});
