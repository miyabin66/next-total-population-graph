import styles from '@/styles/page.module.scss';
import { Contaier } from '@/components/Container';
import { BASE_URL } from '@/env';
import { throwError } from '@/lib/throwError';
import type { GetPrefecturesResponse } from '@/interfaces/prefectures';

export default async function Home() {
  try {
    const res = await fetch(`${BASE_URL}/api/prefectures`);
    const data = (await res.json()) as GetPrefecturesResponse;

    return (
      <main className={styles.main}>
        <Contaier PrefecturesData={data} />
      </main>
    );
  } catch (e) {
    throwError(e);
  }
}
