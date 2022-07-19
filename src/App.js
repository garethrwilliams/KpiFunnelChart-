import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Funnel from './components/Funnel';

function App() {
  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
        <Funnel />
      </div>
    </>
  );
}

export default App;
