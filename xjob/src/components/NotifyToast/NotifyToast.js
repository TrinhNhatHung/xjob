import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import "./notifyToast.css";

function NotifyToast(props) {

  const renderIcon = () => {
    if (props.kind === "success") {
      return <CheckCircleIcon className="successIcon" />;
    } else if (props.kind === "warning") {
      return <WarningIcon className="warningIcon"/>;
    } else if (props.kind === "error") {
      return <ErrorIcon className="errorIcon"/>;
    } else {
      return <React.Fragment />;
    }
  };
  const setNotify = props.setNotify;

  const handleCloseToast = () => {
    setNotify({
        display: false,
        kind: null,
        message: null
    });
  };

  return (
    <div id="notifyToast">
          <div>
            {renderIcon()}
            <span>{props.message}</span>
          </div>
          <div>
            <CloseIcon onClick={handleCloseToast} />
          </div>
    </div>
  );
}

export default NotifyToast;
