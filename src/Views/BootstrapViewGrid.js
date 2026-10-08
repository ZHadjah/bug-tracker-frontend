import React from "react";

function BootstrapViewGrid({
  children,
  contentClassName = "col-12",
  containerClassName = "container-fluid py-3",
}) {
  return (
    <div className={containerClassName}>
      <div className="row g-3">
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}

export default BootstrapViewGrid;
