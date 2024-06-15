import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import router from "./components/Routes";
import client from "./constants/apollo-client";
import queryClient from "./constants/query-client";

import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { path } = usePath();
  const showChatList = path === "/" || path.includes("chats");

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <Guard>
            <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
              {showChatList ? (
                <Grid container spacing={5}>
                  <Grid item xs={12} md={5} lg={4} xl={3}>
                    <ChatList />
                  </Grid>
                  <Grid item xs={12} md={7} lg={8} xl={9}>
                    <Routes />
                  </Grid>
                </Grid>
              ) : (
                <Routes />
              )}
            </Container>
          </Guard>
        </ThemeProvider>
      </ApolloProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "lightgrey",
            color: "black",
          },
        }}
      />
      <Snackbar />
    </QueryClientProvider>
  );
}

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default App;
