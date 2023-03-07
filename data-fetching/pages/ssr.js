import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  console.log('context', context);

  const getData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return 'ssr';
  };

  const data = await getData();

  return {
    props: { data: data },
  };
}

export default function SSR(props) {
  console.log('ssr props', props);
  const [state, setState] = useState('data');

  useEffect(() => {
    setState(props.data);
  }, [props]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js! ------ {state}</h1>
      </main>
    </div>
  );
}
