import { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout/Layout';
import { LibroForm } from './components/LibroForm/LibroForm';
import { SearchFilters } from './components/SearchFilters/SearchFilters';
import { LibroList } from './components/LibroList/LibroList';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { LibrosProvider, useLibros } from './context/LibrosContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function AppContent() {
  const { fetchLibros } = useLibros();

  useEffect(() => {
    fetchLibros();
  }, [fetchLibros]);

  return (
    <Layout>
      <LibroForm />
      <SearchFilters />
      <LibroList />
      <ErrorSnackbar />
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LibrosProvider>
        <AppContent />
      </LibrosProvider>
    </ThemeProvider>
  );
}

export default App;
