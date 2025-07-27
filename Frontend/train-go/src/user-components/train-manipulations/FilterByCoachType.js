import React, { useState, useEffect } from 'react';


export default function FilterByCoachType({defaultCoachType, onUpdateCoachType}) {
  const [coachTypes, setCoachTypes] = useState([]);
  const [selectedCoachType, setSelectedCoachType] = useState(defaultCoachType || 'All Classes');

  useEffect(() => {
    fetchCoachTypes();
  }, []);

  useEffect(() => {
    onUpdateCoachType(selectedCoachType);
  }, [selectedCoachType]);

  const fetchCoachTypes = async () => {
      const response = await fetch('http://localhost:8080/coachtypes');
      const data = await response.json();
      setCoachTypes(data.data || []);
  };

  return (
    <div>
      <select
        className="form-select"
        value={selectedCoachType}
        onChange={(e) => setSelectedCoachType(e.target.value)}
      >
        <option>All Classes</option>
        {coachTypes.map((type) => (
          <option key={type.id} value={type.typeName}>
            {type.typeName}
          </option>
        ))}
      </select>
    </div>
  );
}
