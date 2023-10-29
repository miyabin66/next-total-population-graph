import styles from '@/styles/page.module.scss';
import { Container } from '@/components/Container';
import { BASE_URL } from '@/env';
import { throwError } from '@/lib/throwError';
import type {
  GetPrefecturesActionsResponse,
  GetPrefecturesData,
  GetPrefecturesResponse,
} from '@/interfaces/prefectures';

export default async function Home() {
  try {
    const res = await fetch(`${BASE_URL}/api/prefectures`);
    const data = (await res.json()) as GetPrefecturesResponse;

    // Actions環境とローカル・サイト環境で帰ってくるデータ形式が違うので苦肉の策
    const prefecturesData = (
      (data as GetPrefecturesData).result !== undefined
        ? data
        : (data as GetPrefecturesActionsResponse).data
    ) as GetPrefecturesData;

    return (
      <main className={styles.main}>
        <Container prefecturesData={prefecturesData} />
      </main>
    );
  } catch (e) {
    throwError(e);
  }
}
