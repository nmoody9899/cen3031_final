import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createUnitOfMeasure,
  getUnitOfMeasures,
  removeUnitOfMeasure,
} from "../../../functions/unitofmeasure";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UnitOfMeasureForm from "../../../components/forms/UnitOfMeasureForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const UnitOfMeasureCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [unitofmeasures, setUnitofmeasures] = useState([]);
  //for searching and filtering
  //step 1
  const [keyword, setKeyword] = useState("");

  //load all categories when component mounts
  useEffect(() => {
    loadUnitOfMeasures();
  }, []);

  const loadUnitOfMeasures = () => {
    getUnitOfMeasures().then((c) => {
      setUnitofmeasures(c.data);
      console.log(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to create a Category we need to send the name to back end
    createUnitOfMeasure({ name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Unit of Measure "${res.data.name}" has been created.`);
        loadUnitOfMeasures(); //reload categories immediately
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  //deleting category from backend
  const handleRemove = async (slug) => {
    //do not immediately delete, ask admin if they mean to delete, so warn
    let answer = window.confirm(
      `Are you sure you want to delete Unit of Measure "${slug}"?`
    );

    if (answer) {
      setLoading(true);
      removeUnitOfMeasure(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`Brand ${res.data.name} deleted`);
          loadUnitOfMeasures(); //refresh brands immediately after removal
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    } else {
      //nothing
    }
    //console.log(answer, slug);
  };

  // const categoryForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label>Category Name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         onChange={(e) => setName(e.target.value)}
  //         value={name}
  //         autoFocus
  //         required
  //       />
  //       <br />
  //       <button className="btn btn-outline-primary">Save</button>
  //     </div>
  //   </form>
  // );

  //step 3 search
  // const handleSearchChange = (e) => {
  //   e.preventDefault();
  //   setKeyword(e.target.value.toLowerCase().trim());
  // };

  //step 4 search
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Unit of Measure</h4>
          )}
          <UnitOfMeasureForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/* step 2 & step 3 search: refactored */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <br />
          {/* step 5 search add searched here */}
          {unitofmeasures.filter(searched(keyword)).map((u) => (
            <div className="alert alert-secondary" key={u._id}>
              {u.name}
              <span
                onClick={() => handleRemove(u.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/unitofmeasure/${u.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-primary" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitOfMeasureCreate;
