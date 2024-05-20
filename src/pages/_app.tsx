import store from '@/store/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';

// lang Support Page
import { appWithTranslation } from 'next-i18next';

const poppins = Poppins({
  preload:true,
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div>
        <main className={`${poppins.className} dark:bg-bg-primary-dark`}>
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
}

export default appWithTranslation(App);
