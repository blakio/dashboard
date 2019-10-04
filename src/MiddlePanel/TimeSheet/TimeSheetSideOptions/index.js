import React, { useState } from 'react';
import './TimeSheetSideOptions.css';

function TimeSheetSideOptions(props) {

  const [selected, setSelected] = useState(null);

  const select = (data) => {
    if(data !== selected){
      setSelected(data)
    } else {
      setSelected(null)
    }
  }

  const {
    title,
    options,
    showMore
  } = props;

  return (<div className="timeSheetSideOptions flex">
    <div className="sideOptionHeading sectionHeading flex">
      <p>{title}</p>
    </div>
    <div className="sideOptionBody flex">
      {options.sort().map((data, index) => (
        <div
          onClick={() => select(index)}
          key={index}
          className={`tag ${(selected === index) && "selected"}`}>{data}</div>
      ))}
    </div>
  </div>);
}

export default TimeSheetSideOptions;
