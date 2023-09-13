import React from 'react';
import Router from './shared/Router';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />;
    </QueryClientProvider>
  );
}

export default App;
