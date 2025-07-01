import React, { useEffect, useState } from 'react';
import './launchtable.css';

const API_URL = 'http://98.81.111.230:3000/api/launches'; //Remplazar por la url de aws

export function LaunchTable() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [launchIds, setLaunchIds] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setLaunches(data);
      setFilteredLaunches(data);

      const ids = Array.from(new Set(data.map(l => l.launch_id).filter(Boolean)));
      setLaunchIds(ids);
    } catch (error) {
      console.error('Error al obtener los lanzamientos:', error);
    }
  };

  const handleFilterChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);

    if (id === '') {
      setFilteredLaunches(launches);
    } else {
      const filtered = launches.filter(l => l.launch_id === id);
      setFilteredLaunches(filtered);
    }
  };

  // Mostrar solo las primeras 4 filas
  const displayedLaunches = filteredLaunches.slice(0, 4);

  return (
    <div className="launch-table-container">
      <h2>Launch Table Details</h2>

      <label htmlFor="filter">Filter by Launch ID:   </label>
      <select
        id="filter"
        value={selectedId}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">All releases</option>
        {launchIds.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>

      <table className="launch-table">
        <thead>
          <tr>
            <th>Launch ID</th>
            <th>Flight No</th>
            <th>Mission Name</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {displayedLaunches.map((launch, index) => (
            <tr key={index}>
              <td>{launch.launch_id || 'Sin nombre'}</td>
              <td>{launch.FlightNo || 'N/D'}</td>
              <td>{launch.mission_name || 'N/D'}</td>
              <td>{launch.Notes || 'N/D'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
