import Navbar from './components/Navbar';
const linksArray = ['Products', 'Services', 'Overview', 'Contact US'];

function App() {
  return (
    <div>
      <Navbar links={linksArray} />
    </div>
  );
}

export default App;
