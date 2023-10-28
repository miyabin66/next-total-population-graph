'use client';
import { Graph } from './Graph';
import { Selector } from './Selector';
import styles from '@/styles/components/container.module.scss';
import { useDataSelector } from '@/hooks/useDataSelector';
import type { GetPrefecturesData } from '@/interfaces/prefectures';

interface Props {
  prefecturesData: GetPrefecturesData;
}

export const Contaier = ({ prefecturesData }: Props) => {
  const {
    currentPrefectures,
    displayCondition,
    graphData,
    changePrefectures,
    changeDisplayCondition,
    setGraphData,
  } = useDataSelector();

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>都道府県人口データグラフ</h1>
      <div className={styles.wrapperSelector}>
        <Selector
          prefecturesData={prefecturesData}
          displayCondition={displayCondition}
          changeDisplayCondition={changeDisplayCondition}
          changePrefectures={changePrefectures}
        />
      </div>
      {currentPrefectures !== undefined && (
        <Graph
          displayCondition={displayCondition}
          currentPrefectures={currentPrefectures}
          graphData={graphData}
          setGraphData={setGraphData}
        />
      )}
    </section>
  );
};
