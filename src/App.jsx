import { BrowserRouter } from "react-router-dom";
import Layout from "./conponents/Layout/Layout";
import MainRouter from "./router/MainRouter/MainRouter";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getPrincipalRequest } from "./apis/auth/authApis";

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <MainRouter />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
