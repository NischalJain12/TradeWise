import CryptoCard from './CryptoCard'

function TrendingCoins({ coins }) {
  return (
    <div className='coins-grid'>
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  )
}

export default TrendingCoins