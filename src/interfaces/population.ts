export interface GetPopulationResponse {
  message: null;
  result: PopulationResult;
}

interface PopulationResult {
  boundaryYear: number;
  data: PopulationItemList[];
}

interface PopulationItemList {
  label: PopulationItemLabel;
  data: PopulationItemValue[];
}

export type PopulationGraphData = {
  prefName: string;
  result: PopulationResult;
};

type PopulationItemLabel = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

interface PopulationItemValue {
  year: number;
  value: number;
  rate?: number;
}
