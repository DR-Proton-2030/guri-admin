import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "../components/layout/layout";
import { SearchProvider } from "../components/navbar/SearchContext";

const lightTheme = createTheme({
    type: "light",
    theme: {
        colors: {},
    },
});

const darkTheme = createTheme({
    type: "light",
    theme: {
        colors: {},
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className,
            }}
        >
            <NextUIProvider>
                <SearchProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SearchProvider>
            </NextUIProvider>
        </NextThemesProvider>
    );
}

export default MyApp;
