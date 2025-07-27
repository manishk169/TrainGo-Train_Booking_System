import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TrainList from './train-display/TrainList';
import SearchBySourceDestination from './train-manipulations/SearchBySourceDestination';
import FilterByDate from './train-manipulations/FilterByDate';
import FilterByCoachType from './train-manipulations/FilterByCoachType';
import SortByFare from './train-manipulations/SortByFare.js';


export default function TrainResults() {

  const { state } = useLocation();
  const navigateTo = useNavigate();
  const { trains, from, to, date, coachType } = state || {};

  const [filteredTrains, setFilteredTrains] = useState(trains);
  const [currentSource, setCurrentSource] = useState(from);
  const [currentDestination, setCurrentDestination] = useState(to);
  const [currentDate, setCurrentDate] = useState(date);
  const [currentCoachType, setCurrentCoachType] = useState(coachType);


  useEffect(() => {
    setFilteredTrains(trains)
  }, [trains])

  const handleSearchSubmitData = async (formData) => {
    formData.preventDefault();
    let response = await fetch(`http://localhost:8080/search?travelDate=${currentDate}&source=${currentSource}&destination=${currentDestination}&coachType=${currentCoachType}`,
      { method: 'get' })
    let responseObject = await response.json();
    setFilteredTrains(responseObject.data);
  }

  const sortTrainsByFare = (flag) => {
   let toSort  = [...filteredTrains]
   if(flag === 'asc')
   {
    let sortedTrains = toSort.sort((obj1, obj2)=> {return obj1.baseFare - obj2.baseFare})
    setFilteredTrains(sortedTrains)
   }
   else{
    let sortedTrains = toSort.sort((obj1, obj2)=> {return obj2.baseFare - obj1.baseFare})
    setFilteredTrains(sortedTrains)
   }
  }
  //console.log("Filtered data : " + filteredTrains);


  if (!trains) {
    return <div className="container p-5 text-center">No train data available.</div>;
  }



  return (
    <div className="container-fluid px-4 py-4">
      <div className="text-left mb-4">
        <button className="btn btn-secondary" onClick={() => navigateTo(-1)}>← Back</button>
      </div>

      <form onSubmit={handleSearchSubmitData}>
        <div className="bg-primary p-3 rounded mb-4 text-white mx-auto" style={{ maxWidth: '1100px'}}>
          <div className="row g-2 align-items-center justify-content-center">
            <div className="col-md-6">
              <SearchBySourceDestination fromDefault={from} toDefault={to} onUpdateSource={setCurrentSource} onUpdateDestination={setCurrentDestination} />
            </div>
            <div className="col-md-2">
              <FilterByDate defaultDate={date} onUpdateDate={setCurrentDate} />
            </div>
            <div className="col-md-2">
              <FilterByCoachType defaultCoachType={coachType} onUpdateCoachType={setCurrentCoachType} />
            </div>
            <div className="col-md-2 ">
              <button type="submit" className="btn btn-warning fw-bold">Modify Search</button>
            </div>
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-end mb-3" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="col-md-3">
          <SortByFare onSortTrainByFare={sortTrainsByFare} />
        </div>
      </div>


      <TrainList trains={filteredTrains} />
    </div>
  );
}
