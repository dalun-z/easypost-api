import './css/App.css';
import TransactionForm from './TranscationForm';
import SignIn from './Auth/SignIn';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        {/* <h1>Title</h1> */}
      </header>
      <main>
        <SignIn />
        {/* <TransactionForm /> */}
      </main>
    </div>
  );
}

export default App;
