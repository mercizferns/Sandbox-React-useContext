import React, { useContext } from "react";

const EmployeeList = ({ parentFunction }) => {
  //console.log("child called");
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

  return (
    <div className="floatLeft">
      Select Employee:{" "}
      <select onChange={parentFunction}>
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

export default React.memo(EmployeeList);
