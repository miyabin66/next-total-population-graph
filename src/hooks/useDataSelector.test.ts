import { useDataSelector } from '@/hooks/useDataSelector';
import { renderHook } from '@testing-library/react';

describe('useDataSelectorのテスト', () => {
  test('graphDataの登録状況', () => {
    const { result } = renderHook(() => useDataSelector());

    expect(result.current.graphData).toBe(undefined);
  });
});
