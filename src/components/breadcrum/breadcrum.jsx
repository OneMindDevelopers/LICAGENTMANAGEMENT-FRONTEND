import React from "react";

const BreadCrum = ({ breadcrums }) => {
  return (
    <nav>
      <ol className="breadcrumb custom-breadcrum-styles ">
        {breadcrums?.map((breadcrum) => (
          <li className={`${breadcrum.style}`}>
            {breadcrum.path && (
              <a
                href={`${breadcrum.path}`}
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                {breadcrum.label}
              </a>
            )}
            {!breadcrum.path && breadcrum.label}
          </li>
        ))}
        {/*        
        <li className="breadcrumb-item active">{label}</li> */}
      </ol>
    </nav>
  );
};

export default BreadCrum;
