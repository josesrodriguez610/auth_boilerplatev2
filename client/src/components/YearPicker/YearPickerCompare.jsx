import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMonth,
  changeYear,
  selectMonth,
  selectYear,
} from "../../app/api/yearSlice";
import { rangeYears, rangeMonths } from "./utils";
import axiosInstance from "../Axios/axios";

const YearPickerCompare = ({
  id,
  setState,
  setLoading,
  url,
  setStateBarChart,
}) => {
  const yearsRange = rangeYears();

  const monthsRange = rangeMonths();

  const [years, setYears] = useState(yearsRange);
  const [year, setYear] = useState("");

  const [months, setMonths] = useState(monthsRange);
  const [month, setMonth] = useState("");

  let instance = axiosInstance();

  const handlerYear = (e) => {
    const value = e.target.value;
    setYear(value);
  };

  const handlerMonth = (e) => {
    const value = e.target.value;
    setMonth(value);
  };

  useEffect(() => {
    if (month !== "" && year !== "") {
      getData();
    } else {
      setLoading(false);
    }
  }, [year, month]);

  async function getData() {
    try {
      let response = await instance.get(
        `${url}/${id}?year=${year}&month=${month}`
      );

      if (response.data.success === false) {
        setState([]);
        setLoading(false);
        return console.log("empty");
      }

      let data = await response.data.data;

      setState([data.totalWasteCount]);

      if (setStateBarChart) {
        const barChartValues = Object.values(data?.totalWasteCount);
        setStateBarChart(barChartValues);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

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

export default YearPickerCompare;
