import React from "react";
import { Alert } from "react-bootstrap";



const SuccessMsg = ({ variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15}}>
      <strong>Logged in Successfully!</strong>
    </Alert>
  );
};

export default SuccessMsg;