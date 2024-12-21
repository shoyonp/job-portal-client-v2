import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const { _id, title, company, applicationDeadline } = useLoaderData();

  return (
    <div>
      <h2>job details for{title}</h2>
      <p>apply for: {company}</p>
      <p>deadline: {applicationDeadline}</p>
      <Link to={`/jobApply/${_id}`} className="btn btn-warning">Apply Now</Link>
    </div>
  );
};

export default JobDetails;
