import { BASE_URL } from './env';

export const RESAS_API_URL = 'https://opendata.resas-portal.go.jp/api/v1';

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': BASE_URL || '',
  'Access-Control-Allow-Methods': 'GET',
};

export const TITLE = '都道府県人口構成グラフ';
