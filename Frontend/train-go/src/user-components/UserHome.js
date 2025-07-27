import React, { useEffect, useState } from 'react';
import '../user-components/UserStyling/UserHome.css';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const [coachTypes, setcoachTypes] = useState([]);
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    coachType: 'All Classes',
  });

  const getAllcoachTypes = async () => {
    const response = await fetch("http://localhost:8080/coachtypes");
    const data = await response.json();
    setcoachTypes(data.data);
  };

  useEffect(() => {
    getAllcoachTypes();
  }, []);

  const handleSubmit = async (data) => {
    data.preventDefault();
    const from = data.target.from.value;
    const to = data.target.to.value;
    const date = data.target.date.value;
    const coachType = data.target.coachType.value;

    const response = await fetch(
      `http://localhost:8080/search?travelDate=${date}&source=${from}&destination=${to}&coachType=${coachType}`,
      { method: 'get' }
    );

    const responseObject = await response.json();
    //console.log(responseObject);

    navigateTo('/user/results', {
      state: {
        trains: responseObject.data,
        from,
        to,
        date,
        coachType,
      },
    });
  };

const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="page-background">
      <div className="form-container">
        <h2 className="text-center mb-4">BOOK TICKET</h2>
        <form className="border p-4 rounded shadow bg-white bg-opacity-75" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="From"
                name="from"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="To"
                name="to"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                name="date"
                defaultValue={currentDate}
                required
              />
            </div>

            <div className="col-md-6">
              <select className="form-select" name="coachType">
                <option>All Classes</option>
                {coachTypes &&
                  coachTypes.map((coachType) => (
                    <option key={coachType.id} value={coachType.typeName}>
                      {coachType.typeName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-warning fw-bold">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
