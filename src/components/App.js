import ChessBoard from './ChessBoard'
import GameOver from './GameOver'
import Promote from './Promote'
import Sidebar from './Sidebar'
import Message from './Message'
import BackgroundFigures from './BackgroundFigures'
import { connect } from 'react-redux'
import { newMessage } from '../actions'
import './app.css'
import { useEffect } from 'react'

function App(props) {
  useEffect(() => {
    props.newMessage({ 
      type: 'success', 
      text: 'Welcome to the Chess Game! to play select a piece and then select the cell where you want to move it.'
    })
  }, [props])

  return (
    <div className="App">
      <div className="chessgame">
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
        <BackgroundFigures />
      </div>
      <div className="footer">
        &copy; <a className="footer__link" href="https://github.com/Manuel-2011" target="_blank" rel="noreferrer">Manuel Mosquera</a> - All Rights Reserved
      </div>
      
      <Message />
      <GameOver />
      <Promote />
    </div>
  );
}

export default connect(() => ({}), { newMessage })(App);
