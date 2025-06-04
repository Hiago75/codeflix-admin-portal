import { Box, createTheme, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import Layout from './components/Layout';

const theme = createTheme({})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main"
        sx={{
          height: "100vh",
        }}
      >
        <Header />
        <Layout>
          <h1>Test</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  )
}