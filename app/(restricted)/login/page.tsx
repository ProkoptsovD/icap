'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import cn from 'classnames';

import { authApi } from '@/lib/redux/api/authApi';
import Loader from '@/components/Loader/Loader';

import classes from './styles.module.css';
import { getErrorByName } from '@/lib/react-hook-form/getErrorByName';
import { AuthResponseFailure } from '@/types/common.type';
import { addLoggedInToCookies } from '@/utils/cookies';

const UserSchema = zod.object({
  username: zod.string().min(1).max(150),
  password: zod.string().min(1).max(128),
});

type AuthCredentials = zod.infer<typeof UserSchema>;

const notify = (msg: string) => toast.error(msg);

export default function LoginPage() {
  const router = useRouter();
  const [login, { isSuccess, isError, isLoading, error }] =
    authApi.useLoginMutation();

  const form = useForm<AuthCredentials>({
    resolver: zodResolver(UserSchema),
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    if (isError) {
      const typedError = error as AuthResponseFailure;
      notify(typedError?.data?.error);

      return;
    }

    if (isSuccess) {
      addLoggedInToCookies();
      router.replace('/');
    }
  }, [isSuccess, isError]);

  const usernameError = getErrorByName({ form, name: 'username' });
  const passwordError = getErrorByName({ form, name: 'password' });

  return (
    <FormProvider {...form}>
      <form
        className={cn(classes.wrapper, {
          [classes.noEvents]: isLoading,
        })}
        onSubmit={form.handleSubmit(login)}
      >
        <h2>LOGIN</h2>

        <label className={classes.group}>
          <input
            type="text"
            className={classes.input}
            autoComplete="true"
            disabled={isLoading}
            {...form.register('username')}
          />
          <span className={classes.label}>User name</span>
          {!!usernameError && (
            <strong className={classes.error}>{usernameError.message}</strong>
          )}
        </label>

        <label className={classes.group}>
          <input
            type="password"
            className={classes.input}
            autoComplete="true"
            disabled={isLoading}
            {...form.register('password')}
          />
          <span className={classes.label}>Password</span>
          {!!passwordError && (
            <strong className={classes.error}>{passwordError.message}</strong>
          )}
        </label>

        <button type="submit" className={classes.btn} disabled={isLoading}>
          LOGIN
        </button>

        <span className={classes.footer}></span>
      </form>

      {isLoading && <Loader />}
    </FormProvider>
  );
}
