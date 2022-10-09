import React, { useContext } from "react";
import { AppAbsenceContext } from "./App";

const AbsentDays = () => {
  //console.log(AppContext);
  const context = useContext(AppAbsenceContext);
  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  } else {
    console.log(context);
  }

  //console.log("Absent days child called");
  const employeeListData = [
    {
      title: "Trainee",
      salary: 1000
    },
    {
      title: "Engineer",
      salary: 2000
    },
    {
      title: "Lead",
      salary: 5000
    },
    {
      title: "Manager",
      salary: 10000
    }
  ];

  const handleChange = (evt) => {
    console.log("Absent handler is called");
    let updatedData;
    const isTaxable = (salary) => {
      if (salary > 2500) {
        return true;
      } else {
        return false;
      }
    };
    const calculateTax = (salary) => {
      if (isTaxable(salary)) {
        return salary * 0.025;
      }
      return 0;
    };
    function getDaysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }
    if (evt.target.name === "employeerole") {
      //updatedData = evt.target.value;
      //console.log(updatedData);

      let employeetypeInfo = JSON.parse(evt.target.value);
      let employeesalary = employeetypeInfo.salary;
      let absentMonth = context.state.absentMonth;
      let absentYear = context.state.absentYear;
      let daysInMonth = getDaysInMonth(absentYear, absentMonth);
      let absentDays = context.state.absentDays;

      const calcSalaryPerday = Math.round(employeesalary / daysInMonth);

      let deductableAmt = calcSalaryPerday * absentDays;
      // alert(deductableAmt);
      let calThisMonthSalary = employeesalary - deductableAmt;
      let taxAmt = Math.round(calculateTax(calThisMonthSalary));
      let setSalaryAfterTaxDeduct = calThisMonthSalary - taxAmt;
      updatedData = {
        availSalaryPerday: calcSalaryPerday,
        thisMonthSalary: calThisMonthSalary,
        employeetitle: employeetypeInfo.title,
        taxCutAmount: taxAmt,
        salaryAfterTaxDeduct: setSalaryAfterTaxDeduct
      };
      context.dispatch({ type: "UPDATE_ABSENT_DAYS", payload: updatedData });
    } else if (evt.target.name === "absentDays") {
      updatedData = {
        absentDays: evt.target.value ? evt.target.value : 0
      };

      context.dispatch({ type: "UPDATE_ABSENT_DAYS", payload: updatedData });
    } else {
      var splitMonthYear = evt.target.value.split("-");
      updatedData = {
        absentYear: splitMonthYear[0],
        absentMonth: splitMonthYear[1]
      };
      context.dispatch({
        type: "UPDATE_ABSENT_MONTH_YEAR",
        payload: updatedData
      });
    }
  };

  return (
    <div className="floatLeft">
      Employee absent days
      <input type="number" name="absentDays" onChange={handleChange} />
      {context.state.absentDays}
      <br />
      <br />
      <label>Start month:</label>
      <input type="month" name="absentTiming" onChange={handleChange} />
      <br />
      <br />
      Select Employee:{" "}
      <select name="employeerole" onChange={handleChange}>
        <option value={JSON.stringify({ title: "", salary: 0 })}>
          Select One
        </option>
        {employeeListData.map((value, key) => {
          return (
            <option key={key} value={JSON.stringify(value)}>
              {value.title} : {value.salary}
            </option>
          );
        })}
      </select>
      <br />
    </div>
  );
};

export default AbsentDays;
