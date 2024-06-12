import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect, useState } from 'react';
import { Providers } from '@/services/provider';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useRouter } from 'next/router';
import '@/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showChild, setShowChild] = useState<boolean>(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild || typeof window === 'undefined') {
    return null;
  } else {
    return (
      <Providers pageProps={pageProps}>
        <Provider store={store}>
          <div className="min-h-screen bg-gray-100">
            
            {/* <div className="mt-10 h-20 "></div> */}
            
            <Component {...pageProps} />
            {/* <div className="mt-10 h-20 "></div> */}
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Provider>
      </Providers>
    );
  }
}
