import { PropsWithChildren } from 'react';

import Header from '@/components/Header';
import classes from './layout.module.css';

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <Header />

      <div className={classes.wrapper}>{children}</div>
    </section>
  );
}
