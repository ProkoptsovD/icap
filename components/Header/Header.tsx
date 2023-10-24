'use client';

import { useRouter } from 'next/navigation';

import classes from './styles.module.css';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    router.replace('/login');
  };

  return (
    <header className={classes.header}>
      <p className={classes.logo}>Fancy Site</p>
      <button className={classes.button} type="button" onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
}
