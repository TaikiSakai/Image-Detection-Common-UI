import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/layout';
import { AppRouter } from '@/router';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-black-1">
        <Header />
        <div className="flex-1 overflow-hidden">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
