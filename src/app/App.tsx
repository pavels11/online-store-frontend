import { RouterProvider } from 'react-router';

import ReduxProvider from './providers/redux/ReduxProvider';
import QueryProvider from './providers/query/QueryProvider';
import { router } from './providers/router/router';

function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ReduxProvider>
  );
}

export default App;
