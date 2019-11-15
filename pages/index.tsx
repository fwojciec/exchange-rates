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
  const [err, setErr] = React.useState(false)

  function onGetRate() {
    setRate('')
    setErr(false)
    if (!validateDate(date)) {
      setErr(true)
      return
    }
    fetch(`https://api.exchangeratesapi.io/${date}?base=${agrCur}&symbols=${repCur}`)
      .then(resp => resp.json())
      .then(resp => setRate(resp.rates[repCur]))
      .catch(error => console.log(error))
  }

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRate('')
    setDate(e.target.value)
  }

  function onAgrCurChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRate('')
    setAgrCur(e.target.value)
  }

  function onRepCurChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRate('')
    setRepCur(e.target.value)
  }

  return (
    <div>
      <h1>Exchange rate checker</h1>
      <form>
        <div className="input">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            style={{ color: err ? 'red' : 'inherit' }}
            value={date}
            min="2009-01-02"
            max={new Date().toISOString().split('T')[0]}
            onChange={onDateChange}
          />
        </div>
        <div className="input">
          <label htmlFor="agreement-currency">Agreement Currency</label>
          <select
            id="agreement-currency"
            name="agreement-currency"
            value={agrCur}
            onChange={onAgrCurChange}
          >
            {codes.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <label htmlFor="report-currency">Report Currency</label>
          <select
            id="report-currency"
            name="report-currency"
            value={repCur}
            onChange={onRepCurChange}
          >
            {codes.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </form>
      {rate == '' ? <button onClick={onGetRate}>Get rate</button> : <h2>{rate}</h2>}

      <style global jsx>
        {`
          body {
            font-family: sans-serif;
          }

          label {
            margin-right: 1rem;
            font-size: 0.9rem;
            display: block;
            padding-bottom: 0.2rem;
          }

          input {
            font-size: 1.2rem;
          }

          select {
            font-size: 0.9rem;
            font-family: inherit;
            padding: 0.2rem;
          }

          button {
            margin-top: 1rem;
            font-size: 0.8rem;
            font-family: inherit;
            padding: 0.3rem 0.6rem;
            background: lightgray;
            text-transform: uppercase;
            border: 1px solid darkgray;
            border-radius: 3px;
          }

          .input {
            margin-bottom: 0.5rem;
          }
        `}
      </style>
    </div>
  )
}

export default Home
