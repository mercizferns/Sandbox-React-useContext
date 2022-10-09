import "./styles.css";
import React, { useState, useReducer, useCallback, useEffect } from "react";
import AbsentDays from "./AbsentDays";
import Report from "./Report";

export const AppAbsenceContext = React.createContext();

const InitialAbsenceState = {
  absentYear: 0,
  absentMonth: 0,
  absentDays: 0,
  availSalaryPerday: 0,
  thisMonthSalary: 0,
  employeetitle: "",
  taxCutAmount: 0,
  salaryAfterTaxDeduct: 0
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_ABSENT_DAYS":
    case "UPDATE_ABSENT_MONTH_YEAR":
      console.log("********");
      console.log(payload);
      console.log(state);
      return { ...state, ...payload };

    default:
      console.log("break");
      return InitialAbsenceState;
  }
}

export default function App() {
  console.log("parent called");

  const [state, dispatch] = useReducer(reducer, InitialAbsenceState);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <br />
      <form>
        {/*<EmployeeList parentFunction={setEmployeeInformation}></EmployeeList>*/}
        <br />
        <AppAbsenceContext.Provider value={{ state, dispatch }}>
          <div>
            <AbsentDays></AbsentDays>
          </div>
          <br />
          <hr />
          <div>
            <Report></Report>
          </div>
        </AppAbsenceContext.Provider>
        <br />
      </form>
    </div>
  );
}
