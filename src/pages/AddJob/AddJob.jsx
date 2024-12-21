import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
    const navigate = useNavigate()
  const { user } = useAuth();
  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData.entries());

    const initialData = Object.fromEntries(formData.entries());
    console.log(initialData);
    const { min, max, currency, ...newJob } = initialData;
    console.log(newJob);
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");
    console.log(newJob);

    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your job has been added",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myPostedJobs");
        }
        console.log(data);
      });
  };
  return (
    <div>
      <h2>post a new job</h2>
      <form onSubmit={handleAddJob} className="card-body">
        {/* job title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="input input-bordered"
            required
          />
        </div>
        {/* job location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Location</span>
          </label>
          <input
            type="text"
            placeholder="Job Location"
            name="location"
            className="input input-bordered"
            required
          />
        </div>
        {/* job Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select
            defaultValue={"Pick a job type"}
            className="select select-ghost w-full max-w-xs"
          >
            <option disabled>Pick a job type</option>
            <option>Full-time</option>
            <option>Intern</option>
            <option>Part-time</option>
          </select>
        </div>
        {/* job Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select
            defaultValue={"Pick a job Field"}
            className="select select-ghost w-full max-w-xs"
          >
            <option disabled>Pick a job Field</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Teachng</option>
          </select>
        </div>
        {/* salary range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Salary Range</span>
            </label>
            <input
              type="text"
              placeholder="min"
              name="min"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="max"
              name="max"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <select
              defaultValue={"Currency"}
              name="currency"
              className="select select-ghost w-full max-w-xs"
            >
              <option disabled>Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
        {/* job description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Job Description"
            name="description"
            id=""
            required
          ></textarea>
        </div>
        {/* company name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            placeholder="Compant Name"
            name="company"
            className="input input-bordered"
            required
          />
        </div>
        {/* requirements */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Requirements</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Put each requirements in a new line"
            name="requirements"
            id=""
            required
          ></textarea>
        </div>
        {/* responsibilities */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Responsibilities</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Write each responsibility in a new line"
            name="responsibilities"
            id=""
            required
          ></textarea>
        </div>
        {/* HR name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Name</span>
          </label>
          <input
            type="text"
            placeholder="HR Name"
            name="hr_name"
            className="input input-bordered"
            required
          />
        </div>
        {/* HR email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            defaultValue={user?.email}
            type="text"
            placeholder="HR Email"
            name="hr_email"
            className="input input-bordered"
            required
          />
        </div>
        {/* Application deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input
            defaultValue={user?.email}
            type="date"
            placeholder="Deadline"
            name="applicationDeadline"
            className="input input-bordered"
            required
          />
        </div>
        {/* HR name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Logo URL</span>
          </label>
          <input
            type="url"
            placeholder="Company Logo URL"
            name="company_logo"
            className="input input-bordered"
            required
          />
        </div>
        {/* submit button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
