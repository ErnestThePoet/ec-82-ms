import React from 'react';
import Head from 'next/head';
import styles from '../styles/index.module.scss';
import * as L from "../logics/index";
import stringsRes from '../observables/strings-res';

import Panel from '../components/panel';
import classNames from 'classnames';

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

      <main className={classNames(styles.mainMain,
        "d-flex justify-content-center")} >
        <Panel/>
      </main>
    </div>
  );
}

export default Home;
