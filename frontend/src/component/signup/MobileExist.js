import React from "react";
import { Alert } from "react-bootstrap";

const mobileExist = ({ variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15 }}>
      <strong>This Mobile No. Already Exist!</strong>
    </Alert>
  );
};

export default mobileExist;
