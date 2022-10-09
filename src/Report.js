import React, { useContext } from "react";
import { AppAbsenceContext } from "./App";

const Reports = () => {
  console.log("Reports child called");
  const context = useContext(AppAbsenceContext);
  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  } else {
    console.log(context);
  }
  return (
    <>
      <h3>REPORT</h3>
      You have selected: <b>{context.state.employeetitle}</b>
      <br />
      Pay per day: <b>${context.state.availSalaryPerday}</b>
      <br />
      Your salary for this month is: <b>${context.state.thisMonthSalary}</b>
      <br />
      Tax Amount: <b>${context.state.taxCutAmount}</b>
      <br />
      Salary After Tax deduction: <b>{context.state.salaryAfterTaxDeduct}</b>
      <br />
    </>
  );
};

export default Reports;
