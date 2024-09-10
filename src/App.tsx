import Router from "~/router";
import { Header } from "./components/Header";
import { RegistrationsProvider } from "./contexts/registrationsContext";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { ConfirmationDialogProvider } from "./contexts/confirmationDialogContext";
import { ConfirmationModal } from "./components/Dialogs/ConfirmationDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "./contexts/loaderContext";
import { Loader } from "./components/Loader";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <ConfirmationDialogProvider>
          <LoaderProvider>
            <RegistrationsProvider>
              <Loader>
                <Router />
                <ConfirmationModal />
                <ToastContainer />
              </Loader>
            </RegistrationsProvider>
          </LoaderProvider>
        </ConfirmationDialogProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
