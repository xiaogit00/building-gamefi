import { useState, useEffect } from 'react';
import './App.css';
import AxieRow from './components/AxieRow'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const apiKey = process.env.REACT_APP_APIKEY
  const chainName = 'axie-mainnet'
  const topicHash = '0xb6fa90c3cb274eb5fe963b2deb623847e804c9d2b0791bee8e9883320f404a5d'
  const getLatestBlockEndpoint = `https://api.covalenthq.com/v1/${chainName}/block_v2/latest/`
  const latestBlocksToFetch = 1000
  
  

  useEffect(() => {
    const getLogs = async () => {
      //Fetching latest block
      setLoading(true)
      let latestBlockRes = await fetch(getLatestBlockEndpoint, {method: 'GET', headers: {
        "Authorization": `Basic ${btoa(apiKey + ':')}`
      }})
      latestBlockRes = await latestBlockRes.json()
      const latestBlock = latestBlockRes.data.items[0].height
      const getLogsEndpoint = `https://api.covalenthq.com/v1/${chainName}/events/?starting-block=${Number(latestBlock)-latestBlocksToFetch}&ending-block=latest&topics=${topicHash}`

      //Fetching logs
      let getLogsRes = await fetch(getLogsEndpoint, {method: 'GET', headers: {
        "Authorization": `Basic ${btoa(apiKey + ':')}`
      }})
      getLogsRes = await getLogsRes.json()
      setData(getLogsRes.data.items)
      setLoading(false)
    }
    
    getLogs()
      .catch(console.error)
  }, [getLatestBlockEndpoint, apiKey])


  if (loading) {
    return <div className='title'>Loading...</div>
  }

  if (data) {
    return (
      <div className='container'>
        <p className='title'>Axies spawned in the latest {latestBlocksToFetch} blocks</p>
        {data.map(item => {
          return(
            <AxieRow txHash={item.tx_hash}/>
          )
        })}
      </div>
    );
  }
  
}

export default App;
