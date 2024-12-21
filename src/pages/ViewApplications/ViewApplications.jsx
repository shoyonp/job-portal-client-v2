import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplications = () => {
  const [applications, setApplications] = useState();
  //   const applications = useLoaderData();
  const params = useParams();

  const handleStatusUpdate = (e, id) => {
    console.log(e.target.value, id);
    const data = {
      status: e.target.value,
    };
    fetch(`http://localhost:5000/job-applications/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }, [params.job_id]);
  console.log(applications);
  return (
    <div>
      <h2 className="text-2xl">
        application for this job:{applications?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((app, i) => (
              <tr key={app._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{app.applicant_email}</td>
                <td>Quality Control Specialist</td>
                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, app._id)}
                    defaultValue={app.sattus || "Change Status"}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option disabled>Change Status</option>
                    <option>Under Review </option>
                    <option>Set Interview</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
