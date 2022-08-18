import React from 'react';
import Head from 'next/head';
import styles from '../styles/index.module.scss';
import * as L from "../logics/index";
import stringsRes from '../observables/strings-res';

class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount = () => {
    L.initialize();
  }

  render = () => (
    <div className={styles.container}>
      <Head>
        <title>{stringsRes.strings.APP_TITLE}</title>
        <meta name="description" content="EC-82MS Web Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
      </main>
    </div>
  );
}

export default Home;
