import ThemeProvider from '@/components/ThemeProvider';
import AppRouter from '@/routes/AppRouter';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
