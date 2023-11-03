import { Container } from '@/components/Container';
import { PREFECTURES_DATA } from '@/mock/prefecturesData';
import { DisplayConditionsList } from '@/interfaces/prefectures';
import { userEvent } from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';

describe('containerのテスト', () => {
  beforeEach(() => {
    cleanup();
  });

  test('ページアクセス時はGraphが非表示', () => {
    render(<Container prefecturesData={PREFECTURES_DATA} />);

    const element = screen.queryByText(
      `${DisplayConditionsList['総人口']}グラフ`,
    );

    expect(element).not.toBeInTheDocument();
  });

  test('ページアクセス後、北海道を選択しGraphを表示させる', async () => {
    render(<Container prefecturesData={PREFECTURES_DATA} />);

    const hokkaido = screen.getByDisplayValue('北海道');

    await userEvent.click(hokkaido);

    const element = screen.getByRole('heading', {
      level: 2,
      name: `${DisplayConditionsList['総人口']}グラフ`,
    });

    expect(element).toBeInTheDocument();
  });
});
