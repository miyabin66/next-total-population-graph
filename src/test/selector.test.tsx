import { Selector } from '@/components/Selector';
import { DisplayConditionsList } from '@/interfaces/prefectures';
import { PREFECTURES_DATA } from '@/mock/prefecturesData';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('Selectorの関数発火テスト', () => {
  beforeEach(() => {
    cleanup();
  });

  test('都道府県と条件指定の選択関数が呼ばれているか', () => {
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
});
