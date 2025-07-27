import React, { useState, useEffect } from 'react';

export default function FilterByDate({ defaultDate, onUpdateDate }) {
  const [date, setDate] = useState(defaultDate);

  useEffect(() => {
    onUpdateDate(date);
  }, [date]);

  return (
    <div className="d-flex align-items-center">
      <input
        type="date"
        className="form-control"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
    </div>
  );
}
