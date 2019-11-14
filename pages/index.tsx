import React from 'react'

function mostRecentRoyDate() {
  const now = new Date()
  const year = now.getFullYear()
  if (now.getMonth() <= 5) {
    return `${year - 1}-12-31`
  }
  return `${year}-06-30`
}

const Home: React.FC = () => {
  const [date, setDate] = React.useState(mostRecentRoyDate())
  const [agrCur, setAgrCur] = React.useState('USD')
  const [repCur, setRepCur] = React.useState('PLN')
  const [rate, setRate] = React.useState('')

  function onGetRate() {
    setRate('')
    fetch(`https://api.exchangeratesapi.io/${date}?base=${agrCur}&symbols=${repCur}`)
      .then(resp => resp.json())
      .then(resp => setRate(resp.rates[repCur]))
  }

  return (
    <div>
      <h1>Exchange rate checker</h1>
      <form>
        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="text"
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="agreement-currency">Agreement Currency</label>
          <input
            id="agreement-currency"
            name="agreement-currency"
            type="text"
            value={agrCur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgrCur(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="report-currency">Report currency</label>
          <input
            id="report-currency"
            name="report-currency"
            type="text"
            value={repCur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepCur(e.target.value)}
          />
        </div>
      </form>
      <button onClick={onGetRate}>Get rate</button>

      {rate != '' && (
        <div>
          <h1>{rate}</h1>
        </div>
      )}
    </div>
  )
}

export default Home
