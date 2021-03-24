import ChessBoard from './ChessBoard'
import GameOver from './GameOver'
import Sidebar from './Sidebar'
import Message from './Message'
import './app.css'

function App() {
  return (
    <div className="App">
      <div className="content">
        <aside className="section-sidebar">
          <Sidebar />
        </aside>
        <main className="section-main">
          <div className="title">
            <h1 className="title-text">Chess Game</h1>
          </div>
          <ChessBoard />
        </main>
      </div>
      
      <Message />
      <GameOver />
    </div>
  );
}

export default App;
