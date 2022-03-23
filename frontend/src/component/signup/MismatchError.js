import React from "react";
import { Alert } from "react-bootstrap";

const MismatchError = ({ variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15 }}>
      <strong>Password Do Not Match!</strong>
    </Alert>
  );
};

export default MismatchError;
