'use client';
import { usePopulation } from '@/hooks/api/usePopulation';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useMemo, useState } from 'react';
import type { DisplayConditions } from '@/interfaces/prefectures';
import type { PopulationResult } from '@/interfaces/population';

interface Props {
  displayCondition: DisplayConditions;
  prefCode: number;
}

export const Graph = ({ displayCondition, prefCode }: Props) => {
  const [graphData, setGraphData] = useState<PopulationResult[]>();
  const { populationData } = usePopulation({
    prefCode,
  });

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }

  useEffect(() => {
    if (!populationData) return;

    const data = populationData.result;

    setGraphData((prev) => {
      if (!prev) {
        return [data];
      }

      const exsistData = prev.filter((item) => item === data);

      if (exsistData.length === 0) {
        return [...prev, data];
      }

      return prev;
    });
  }, [populationData]);

  const options = useMemo(() => {
    const title = {
      title: {
        text: 'グラフ',
      },
    };
    if (!graphData) {
      return title;
    }

    const list = graphData.map((item) => {
      return item.data.filter((data) => data.label === displayCondition)[0];
    });
    const year = list[0].data.map((dataItem) => {
      dataItem.year;
    });
    const series = list.map((listItem) => {
      return {
        data: listItem.data.map((dataItem) => {
          return dataItem.value;
        }),
      };
    });

    return {
      ...title,
      xAxis: {
        title: {
          text: '年度',
        },
        categories: year,
      },
      yAxis: {
        title: {
          text: list[0].label,
        },
      },
      series,
    };
  }, [displayCondition, graphData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
