import React from "react";
import { Alert } from "react-bootstrap";

const FillAllFielderror = ({ variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15 }}>
      <strong>Please Fill All The Required Fields!</strong>
    </Alert>
  );
};

export default FillAllFielderror;
