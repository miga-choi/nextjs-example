import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export async function getClientSideProps() {
  const getData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return 'csr';
  };

  const data = await getData();

  return {
    props: { data: data },
  };
}

export default function SSR(props) {
  console.log('csr props', props);

  const [state, setState] = useState('data');

  // (async () => {
  //   props = (await getClientSideProps()).props;
  //   setState(props.data);
  // })();

  useEffect(() => {
    (async () => {
      setState((await getClientSideProps()).props.data);
    })();
  }, [props.data]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js! ------ {state}</h1>
      </main>
    </div>
  );
}
