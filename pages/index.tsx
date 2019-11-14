import React from 'react'

const codes = [
  'AUD',
  'BGN',
  'BRL',
  'CAD',
  'CHF',
  'CNY',
  'CZK',
  'DKK',
  'EUR',
  'GBP',
  'HKD',
  'HRK',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'ISK',
  'JPY',
  'KRW',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PHP',
  'PLN',
  'RON',
  'RUB',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'USD',
  'ZAR'
]

function validateDate(date: string): boolean {
  const max = new Date()
  const min = new Date('2009-01-02')
  const parsed = new Date(date)
  if (isNaN(parsed.valueOf()) || parsed > max || parsed < min) {
    return false
  }
  return true
}

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
    if (!validateDate(date)) {
      setRate('Date is invalid')
      return
    }
    fetch(`https://api.exchangeratesapi.io/${date}?base=${agrCur}&symbols=${repCur}`)
      .then(resp => resp.json())
      .then(resp => setRate(resp.rates[repCur]))
      .catch(error => console.log(error))
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
          <select
            id="agreement-currency"
            name="agreement-currency"
            value={agrCur}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAgrCur(e.target.value)}
          >
            {codes.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="report-currency">Report Currency</label>
          <select
            id="report-currency"
            name="report-currency"
            value={repCur}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRepCur(e.target.value)}
          >
            {codes.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
