import React from "react";

const AllCards = ({ data }) => {
  return (
    <div>
      <table className="table table-striped table-bordered border-dark ">
        <thead>
          <tr>
            <th>No</th>
            <th>Services</th>
            <th>Frequency</th>
            <th>Area</th>
            <th>Preferred</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            const { frequency, area, service, preferred } = data;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{service}</td>
                <td>{frequency}</td>
                <td>{area}</td>
                <td>{`${preferred[0].day} / ${preferred[0].time}`}</td>
                <td>
                  <button className="btn btn-primary">Update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCards;
