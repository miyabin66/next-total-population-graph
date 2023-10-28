export type GetPrefecturesResponse =
  | GetPrefecturesData
  | GetPrefecturesActionsResponse;

export interface GetPrefecturesActionsResponse {
  data: GetPrefecturesData;
}

export interface GetPrefecturesData {
  message: null;
  result: PrefecturesList[];
}

export interface PrefecturesList {
  prefCode: number;
  prefName: string;
}

export const DisplayConditionsList = {
  総人口: '総人口',
  年少人口: '年少人口',
  生産年齢人口: '生産年齢人口',
  老年人口: '老年人口',
} as const;

export type DisplayConditions =
  (typeof DisplayConditionsList)[keyof typeof DisplayConditionsList];
