import type { PropsWithChildren } from 'react';

import classes from './layout.module.css';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <section className={classes.layout}>{children}</section>;
}
