import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Header } from './components/Header/Header.jsx';
import { LaunchChart } from './components/GraphicLine/LaunchChart.jsx';
import { Summary } from './components/Summary/Summary.jsx';
import { LaunchTable } from './components/LaunchTable/LaunchTable.jsx';


createRoot(document.getElementById('root')).render(
    <div className="app-container">
      <Header />
      <main className="bento-grid">
        <div className="chart-section">
          <LaunchChart/>
        </div>
        <div className="summary-section">
          <Summary/>
        </div>
        <div className="table-section">
          <LaunchTable/>
        </div>
      </main>
    </div>
)
