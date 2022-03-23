import React from "react";
import { Alert } from "react-bootstrap";



const SignUpMismatchError = ({ variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15}}>
      <strong>Password Mismatch!</strong>
    </Alert>
  );
};

export default SignUpMismatchError;