import { useState } from 'react'
import './App.css'
import Header from './common/header'
import Footer from './common/footer'
import Illust from './illust/illust'
import Vrchat from './vrchat/vrchat'
import Bio from './bio/bio'
import Music from './music/music'

type ContentState = 'Illust' | 'Vrchat' | 'Bio' | 'Music';

function App() {
  const [content, setContent] = useState<ContentState>('Illust');
  return (
    <>
      <div className="overflow-hidden h-screen w-full ">
        <div className="w-full">
          <Header />
        </div>
        <div>
          {content === 'Illust' ? <Illust /> :
            content === 'Vrchat' ? <Vrchat /> :
            content === 'Bio'    ? <Bio /> :
            content === 'Music'  ? <Music /> :
            null}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
