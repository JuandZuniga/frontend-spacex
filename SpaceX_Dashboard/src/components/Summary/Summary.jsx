import './summary.css'
import { useEffect, useState } from 'react';

const API_BASE = 'http://98.81.111.230:3000/api'; //Reemplazar la url de aws

export function Summary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch(`${API_BASE}/summary`);
        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error('Error al obtener el resumen:', error);
      }
    }

    fetchSummary();
  }, []);

  if (!summary) return <p>Cargando resumen...</p>;

  return (
    <div className='summary-info-content'>
        <h2>SpaceX travels</h2>
        <span>Summary of releases over the years</span>
        <div className='success'>Succes Launches: {summary.success}  
           <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#4caf50" stroke-width="1.4"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill="#4caf50"></path></svg>
        </div>
        <div className='failed'>Failed Launches: {summary.failed} 
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f44336" stroke-width="1.4"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.61617 3.6419C10.6736 1.80296 13.3268 1.80296 14.3841 3.6419L22.4271 17.6296C23.4813 19.463 22.1579 21.7504 20.0431 21.7504H3.95721C1.84242 21.7504 0.519055 19.463 1.57322 17.6296L9.61617 3.6419ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V9C11.25 8.58579 11.5858 8.25 12 8.25ZM12.5675 17.5008C12.8446 17.1929 12.8196 16.7187 12.5117 16.4416C12.2038 16.1645 11.7296 16.1894 11.4525 16.4973L11.4425 16.5084C11.1654 16.8163 11.1904 17.2905 11.4983 17.5676C11.8062 17.8447 12.2804 17.8197 12.5575 17.5119L12.5675 17.5008Z" fill="#f44336"></path></svg>
        </div>
        <div className='upcoming'>Upcoming Launches: {summary.upcoming}
           <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ff7d00"><path d="M10.9629 6.07266C11.5025 5.425 12.4974 5.425 13.037 6.07266L17.256 11.1354C17.6732 11.6361 17.6732 12.3633 17.2561 12.8639L13.0371 17.9267C12.4974 18.5743 11.5025 18.5743 10.9629 17.9267L6.74376 12.8639C6.3266 12.3633 6.32675 11.6361 6.7439 11.1354L10.9629 6.07266Z" fill="#ff7d00"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" fill="#ff7d00"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25Z" fill="#ff7d00"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12Z" fill="#ff7d00"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12Z" fill="#ff7d00"></path></svg>
        </div>
    </div>
  );
}
