import { useState, useEffect } from 'react';
import './App.css';
import AxieRow from './components/AxieRow'

function App() {
  const [data, setData] = useState([...Array(6).keys()])
  const [loading, setLoading] = useState(false)
  const latestBlocksToFetch = 1000

  if (loading) {
    return <div className='title'>Loading...</div>
  }

  if (data) {
    return (
      <div className='container'>
        <p className='title'>Axies spawned in the latest {latestBlocksToFetch} blocks</p>
        {data.map(item => {
          return(
            <AxieRow txHash={'0x...'}/>
          )
        })}
      </div>
    );
  }
  
}

export default App;
