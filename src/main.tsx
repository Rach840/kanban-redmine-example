import {createRoot} from 'react-dom/client'
import './index.css'
import App from "./app";
import {BrowserRouter} from 'react-router';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
        <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <PrimeReactProvider>
    <App />
        </PrimeReactProvider>
    </BrowserRouter>
        </QueryClientProvider>
)
