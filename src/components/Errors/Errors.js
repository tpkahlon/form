import React from "react";

const Errors = ({ formErrors }) => {
  return (
    <>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <aside key={i} className="form__errors">
              <span>
                {fieldName} {formErrors[fieldName]}
              </span>
            </aside>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default Errors;
