import { RouterProvider } from 'react-router';

import ReduxProvider from './providers/redux/ReduxProvider';
import QueryProvider from './providers/query/QueryProvider';
import AuthInitializer from './providers/auth/AuthInitializer';
import { router } from './providers/router/router';

function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AuthInitializer />
        <RouterProvider router={router} />
      </QueryProvider>
    </ReduxProvider>
  );
}

export default App;
