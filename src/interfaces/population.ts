export interface GetPerYearResponse {
  message: null;
  result: {
    boundaryYear: number;
    data: PerYearItemList[];
  };
}

interface PerYearItemList {
  label: PerYearItemLabel;
  data: PerYearItemValue[];
}

type PerYearItemLabel = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

interface PerYearItemValue {
  year: number;
  value: number;
  rate?: number;
}
