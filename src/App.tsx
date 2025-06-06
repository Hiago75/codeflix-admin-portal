import { Box, ThemeProvider, Typography } from '@mui/material';
import { Route, Routes } from 'react-router';
import { appTheme } from './config/theme';
import { SnackbarProvider } from 'notistack';

import Header from './components/Header';
import Layout from './components/Layout';
import CategoryList from './features/categories/CategoryList';
import CategoryCreate from './features/categories/CategoryCreate';
import CategoryEdit from './features/categories/CategoryEdit';

export const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2500}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <App />
        <Box component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900]
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path='/categories' element={<CategoryList />} />
              <Route path='/categories/create' element={<CategoryCreate />} />
              <Route path='/categories/edit/:id' element={<CategoryEdit />} />

              <Route path="*" element={(
                <Box>
                  <Typography variant='h1'>404</Typography>
                  <Typography variant='h2'>Page not found</Typography>
                </Box>
              )} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider >
  )
}