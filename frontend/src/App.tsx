import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import UserComponent from './views/Users/user.component';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserComponent />
    </ApolloProvider>
  );
}

export default App;
