import { Providers } from '@/lib/providers';
import { Toaster } from 'react-hot-toast';

import classes from './rootLayout.module.css';
import '@/styles/index.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <main className={classes.main}>{children}</main>

          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
              },
            }}
          />
        </body>
      </html>
    </Providers>
  );
}
