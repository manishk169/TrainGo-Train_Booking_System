import React from 'react';

export default function SortByFare({ onSortTrainByFare }) {
  return (
    <div>
       <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" style={{ color: '#830600'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort By Fare
                </button>
                <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => {onSortTrainByFare('asc')}}>
                            Low to High</button></li>

                        <li><button className="dropdown-item" onClick={() => {onSortTrainByFare('desc') }}>
                            High to Low</button></li>
                    
                </ul>
            </div>
    </div>

  );
}
