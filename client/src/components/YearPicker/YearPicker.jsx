import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMonth,
  changeYear,
  selectMonth,
  selectYear,
} from "../../app/api/yearSlice";
import { rangeYears, rangeMonths } from "./utils";

const YearSelector = () => {
  const yearSelector = useSelector(selectYear);
  const dispatch = useDispatch();
  const yearsRange = rangeYears();

  const monthSelector = useSelector(selectMonth);
  const monthsRange = rangeMonths();

  const [years, setYears] = useState(yearsRange);
  const [year, setYear] = useState(yearSelector);

  const [months, setMonths] = useState(monthsRange);
  const [month, setMonth] = useState(monthSelector);

  const handlerYear = (e) => {
    const value = e.target.value;
    setYear(value);
    dispatch(changeYear(value));
  };

  const handlerMonth = (e) => {
    const value = e.target.value;
    setMonth(value);
    dispatch(changeMonth(value));
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ display: "flex", alignItems: "center", paddingRight: "5px" }}
      >
        <label style={{ fontWeight: 600 }}>month:</label>
        <select
          style={{ padding: "4px", borderRadius: "5px" }}
          name={month}
          // ref={ref}
          onChange={handlerMonth}
          value={month}
        >
          <option key={""} value={""}></option>
          {months.map((month) => (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ fontWeight: 600 }}>year:</label>
        <select
          style={{ padding: "4px", borderRadius: "5px" }}
          name={year}
          // ref={ref}
          onChange={handlerYear}
          value={year}
        >
          <option key={""} value={""}></option>
          {years.reverse().map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearSelector;
