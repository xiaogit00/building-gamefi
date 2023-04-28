import { useState, useEffect } from 'react';
import '../App.css';

const AxieRow = ( {txHash} ) => {
    const [data, setData] = useState([...Array(1).keys()])
    const [loading, setLoading] = useState(false)
 

    if (loading) {
        return <div className='title'>Loading...</div>
    } 

    if (data) {
        console.log("data",data)
        return (
            <>
                <div className='sectionContainer'>
                    {data.map(item => {
                        return (
                            <div className='rowTxn' key={item}>
                                <div className='txnContainer'> 
                                    <SpawnDate date={'13 May 2023'} />
                                    <AxieLogo imgUrl={'https://res.cloudinary.com/dl4murstw/image/upload/v1682603151/axie_logo_kb5omk.png'}/>
                                    <TwoRowText 
                                        top={'Axie #000000 Spawned'} 
                                        bottom={'ronin:0000000000000000000000000000'} 
                                        address={'00000000'}
                                    />
                                    <TokensTransferred axs={'000'} slp={'00000'}/>
                                    <Breed breed={'different'} />
                                    <Gas feesPaid={'0000'}/>
                                    <ViewTxn txHash={'0000'}/>
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