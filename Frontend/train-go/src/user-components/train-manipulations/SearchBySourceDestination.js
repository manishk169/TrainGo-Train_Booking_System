import React, { useState, useEffect } from 'react';

export default function SearchBySourceDestination({ fromDefault, toDefault, onUpdateSource, onUpdateDestination }) {
  const [from, setFrom] = useState(fromDefault);
  const [to, setTo] = useState(toDefault);

  useEffect(() => {
    onUpdateSource(from);
  }, [from]);

  useEffect(() => {
    onUpdateDestination(to);
  }, [to]);

  return (
    <div className="row g-2 align-items-center">
      <div className="col">
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
          <input
            type="text"
            className="form-control"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From Station"
            required
          />
        </div>
      </div>
      <div className="col">
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-geo-fill"></i></span>
          <input
            type="text"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To Station"
            required
          />
        </div>
      </div>
    </div>
  );
}
