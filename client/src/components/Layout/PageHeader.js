import React from "react";
import { useSelector } from "react-redux";

const PageHeader = (props) => {
  const { data, title, fullTitle, search, setSearch, openModal } = props;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div className="row">
      <div className="col-md-10">
        {data.length === 0 ? (
          <div className="col-md-9 mb-3">
            <h4>No {title} Added!</h4>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6 mb-3">
              {fullTitle ? <h4>{fullTitle}</h4> : <h4>{title} List</h4>}
            </div>
            {setSearch && (
              <div className="col-md-6 mb-3">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-search fa-lg" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search By Contact Or Email"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {userInfo && (
        <div className="col-md-2">
          <button
            onClick={() => openModal({})}
            className="btn btn-secondary btn-sm btn-block"
          >
            <strong>Add</strong>
          </button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
