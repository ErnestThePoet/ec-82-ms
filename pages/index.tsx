import React from 'react';
import Head from 'next/head';
import styles from '../styles/index.module.scss';
import * as L from "../logics/index";
import stringsRes from '../observables/strings-res';

import Panel from '../components/panel';

class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount = () => {
    L.initialize();
  }

  render = () => (
    <div>
      <Head>
        <title>{stringsRes.strings.APP_TITLE}</title>
      </Head>

      <main className={styles.mainMain} >
        <Panel/>
      </main>
    </div>
  );
}

export default Home;
