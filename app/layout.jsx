import '@/styles/globals.css'

import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
/*
Pasos para usar Providers de Next.js
1. En componentes se crea un archivo llamado provider, el cual importa y utiliza el SessionProvider de next-auth
2. Envolvemos todo lo que esta dentro del body con el componente Provider
3. Creamos carpetas dentro de app/api/auth/[...nextauth]/route.js
*/

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
