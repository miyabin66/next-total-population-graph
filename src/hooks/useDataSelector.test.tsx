import { Selector } from '@/components/Selector';
import { PREFECTURES_DATA } from '@/mock/prefecturesData';
import { DisplayConditionsList } from '@/interfaces/prefectures';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('useDataSelectorのテスト', () => {
  beforeEach(() => {
    cleanup();
  });

  test('checkboxの関数が呼ばれているか', () => {
    const onChangeDisplayCondition = jest.fn();
    const onChangePrefectures = jest.fn();
    render(
      <Selector
        prefecturesData={PREFECTURES_DATA}
        displayCondition={DisplayConditionsList['総人口']}
        changeDisplayCondition={onChangeDisplayCondition}
        changePrefectures={onChangePrefectures}
      />,
    );

    const hokkaido = screen.getByDisplayValue('北海道');
    const workingPopulation = screen.getByDisplayValue('年少人口');

    fireEvent.click(hokkaido, { target: { checked: true } });
    fireEvent.click(workingPopulation, { target: { checked: true } });

    expect(onChangePrefectures).toHaveBeenCalled();
    expect(onChangeDisplayCondition).toHaveBeenCalled();
  });

  test('', () => {
    // const { result } = renderHook(() => useDataSelector());
    // const graphData = result.current.graphData;
    // const currentPrefectures = result.current.currentPrefectures;
    // expect(graphData).toBe(undefined);
    // expect(currentPrefectures).toBe(undefined);
  });
});
