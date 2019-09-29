import React from 'react';
import './TimeSheetSideOptions.css';

function TimeSheetSideOptions(props) {

  const {
    title,
    options
  } = props;

  return (<div className="timeSheetSideOptions flex">
    <div className="sideOptionHeading sectionHeading flex">
      <p>{title}</p>
    </div>
    <div className="sideOptionBody flex">
      {options.map(data => <div className="tag">{data}</div>)}
    </div>
  </div>);
}

export default TimeSheetSideOptions;
