import React from "react";
import { Alert } from "react-bootstrap";



const ErrorMessage = ({ variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15}}>
      <strong>Invalid Mobile No. or Password!</strong>
    </Alert>
  );
};

export default ErrorMessage;