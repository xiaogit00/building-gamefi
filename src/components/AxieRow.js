import { useState, useEffect } from 'react';
import '../App.css';

const AxieRow = ( {txHash} ) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const apiKey = process.env.REACT_APP_APIKEY
    const chainName = 'axie-mainnet'
    const getTxEndpoint = `https://api.covalenthq.com/v1/${chainName}/transaction_v2/${txHash}/`
    const truncateRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

    const truncateEthAddress = (address) => {
        const match = address.match(truncateRegex);
        if (!match) return address;
        return `${match[1]}…${match[2]}`;
      };

    useEffect(() => {
        setLoading(true)
        fetch(getTxEndpoint, {method: 'GET', headers: {
          "Authorization": `Basic ${btoa(apiKey + ':')}`
        }})
          .then(res => res.json())
          .then(res => {
            setLoading(false)
            console.log(res.data.items)
            setData(res.data.items)
          })
          .catch(err => console.log(err.message))
      }, [getTxEndpoint, apiKey])

    if (loading) {
        return <div className='title'>Loading...</div>
    } 

    if (data) {
        return (
            <>
                <div className='sectionContainer'>
                    {data.map(item => {
                        return (
                            <div className='rowTxn' key={item}>
                                <div className='txnContainer'> 
                                    <SpawnDate date={new Date(item.block_signed_at).toLocaleString('en-US', { day: 'numeric', month: 'short' })} />
                                    <AxieLogo imgUrl={'https://res.cloudinary.com/dl4murstw/image/upload/v1682603151/axie_logo_kb5omk.png'}/>
                                    <TwoRowText 
                                        top={'Axie #' + parseInt(item.log_events[1].raw_log_topics[1], 16) + ' Spawned'} 
                                        bottom={'ronin:' + truncateEthAddress(item.from_address.slice(2))} 
                                        address={item.from_address}
                                    />
                                    <TokensTransferred axs={Number(item.log_events[6].decoded.params[2].value)/(10**18)} slp={item.log_events[5].decoded.params[2].value}/>
                                    <Breed breed={parseInt(item.log_events[3].raw_log_topics[2], 16)} />
                                    <Gas feesPaid={(Number(item.fees_paid) / (10**18)).toFixed(5)}/>
                                    <ViewTxn txHash={item.tx_hash}/>
                                </div>
                            </div>
                            )
                        }
                    )}
                </div>
            </>
        )
    }
}

export default AxieRow

const SpawnDate = ( {date} ) => {
    return (
        <div className='date'><div className='dateText'>{date}</div></div>
    )
}

const AxieLogo = ( { imgUrl } ) => {
    return (
        <div><img className='axieImage' src={imgUrl} alt='tokenlogo'/></div>
    )
}

const TwoRowText = ( { top, bottom, address }) => {
    return (
        <div className='spawnInfo'>
            <p className='spawnText'>{top}</p>
            <p className='spawnText grey'>to: <a href={"https://app.roninchain.com/address/" + address} target='_blank' rel='noreferrer'>{bottom}</a></p>
        </div>
    )
}

const TokensTransferred = ( { axs, slp }) => {
    return (
        <div className='flex column align-start'>
            <div className='flex align-center'>
                <img src="https://res.cloudinary.com/dl4murstw/image/upload/v1682641177/axslogo_lledar.png" alt="AXS token" height="24px"/>
                <p className='margin-0 font-s'>{axs} AXS</p>
            </div>
            <div className='flex align-center' >
                <img src="https://res.cloudinary.com/dl4murstw/image/upload/v1682641204/slplogo_ddd0kj.png" alt="SLP token" height="24px"/>
                <p className='margin-0 font-s'>{slp} SLP</p>
            </div>
        </div>
    )
}

const Breed = ( { breed } ) => {
    return (
        <div className='font-s'>Breed #{breed}</div>
    )
}

const Gas = ( { feesPaid }) => {
    return (
        <div className='rightTxn'>
            <div className='gasEth'>{feesPaid}
                <img alt="" src="https://res.cloudinary.com/dl4murstw/image/upload/v1668511869/gas-station_ydpfe5.png" height="12"/>
            </div>
            <div className='gasQuote'> RON</div>
        </div>
    )
}

const ViewTxn = ( { txHash }) => {
    return (
        <div><a href={"https://app.roninchain.com/tx/" + txHash} target='_blank' rel='noreferrer' ><img src={"https://res.cloudinary.com/dl4murstw/image/upload/v1668603285/external-link_kl6vf5.png"} alt="tx" height="16px"/></a></div>
    )
}