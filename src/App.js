import React, { useEffect, useState } from 'react';
import './App.css';

const PERCENTAGEARRAY = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
function App() {
  const [estHigh, setEstHigh] = useState(11);
  const [estLow, setEstLow] = useState(9);
  const [curPrice, setCurPrice] = useState(10);
  const [totalMoney, setTotalMoney] = useState(100000);
  const [showResult, setShowResult] = useState([]);
  const calcResult = () => {
    const earn = (estHigh - curPrice) / curPrice;
    const lost = (curPrice - estLow) / curPrice;
    const result = PERCENTAGEARRAY.map(per => {
      const edge = earn * per - lost * (100 - per);
      // console.log(earn, lost, edge, per);
      return { per, rate: edge / earn };
    });
    setShowResult(result);
  }
  useEffect(() => {
    calcResult();
  }, [estHigh, estLow, curPrice, totalMoney])
  return (
    <div className="App">
      <h2>仓位计算</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          总投资额： <input value={totalMoney} onChange={a => setTotalMoney(a.target.value)} />
        </label>
        <label>
          预估最高： <input value={estHigh} onChange={a => setEstHigh(a.target.value)} />
        </label>
        <label>
          当前股价： <input value={curPrice} onChange={a => setCurPrice(a.target.value)} />
        </label>
        <label>
          预估最低： <input value={estLow} onChange={a => setEstLow(a.target.value)} />
        </label>
      </div>
      <button onClick={() => calcResult()}><b>计算</b></button>
      {showResult.length > 0 && <div>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>上涨概率</th>
              <th colSpan={3}>建议</th>
            </tr>

            <tr>
              <th>仓位</th>
              {totalMoney > 0 && <>
                <th>可买股数</th>
                <th>可投资金</th>

              </>}
            </tr>
          </thead>
          <tbody>
            {showResult.map(row => {
              return <tr key={row.per} style={row.rate > 0 ? { color: 'black' } : { color: 'red' }}>
                <td>{row.per}%</td>
                <td>{parseFloat(row.rate).toFixed(0)}%</td>
                {totalMoney > 0 &&
                  <>
                    <td>{Math.floor(totalMoney * row.rate / 100 / curPrice)}</td>
                    <td>${parseFloat(Math.floor(totalMoney * row.rate / 100 / curPrice) * curPrice).toFixed(0)}</td>
                  </>
                }
              </tr>
            })}
          </tbody>
        </table>
      </div>}

    </div>

  );
}

export default App;
