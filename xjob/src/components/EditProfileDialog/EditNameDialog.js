import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./editProfileDialog.css";
import {
  closeProfileDialog,
  setProfile,
} from "../../reducer/editProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import { useRef } from "react";

function EditNameDialog(props) {
  const profileDialog = useSelector((state) => state.profileDialog);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeProfileDialog());
    setError({
      lastName: null,
      firstName: null,
    });
  };

  const [error, setError] = useState({
    lastName: null,
    firstName: null,
  });

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    dispatch(
      setProfile({
        ...profileDialog,
        [name]: value,
      })
    );
  };

  const lastNameRef = useRef();
  const firstNameRef = useRef();

  const saveInput = ()=> {
    lastNameRef.current.classList.remove("borderError");
    firstNameRef.current.classList.remove("borderError");

    let validate = true;
    let lastNameCheck = null;
    if (profileDialog.lastName === null || profileDialog.lastName === undefined || profileDialog.lastName === ""){
      validate = false;
      lastNameCheck = "Bắt buộc";
      lastNameRef.current.classList.add("borderError");
    }
    let firstNameCheck = null;
    if (profileDialog.lastName === null || profileDialog.lastName === undefined || profileDialog.lastName === ""){
      validate = false;
      firstNameCheck = "Bắt buộc";
      firstNameRef.current.classList.add("borderError");
    }

    setError({
      lastName: lastNameCheck,
      firstName: firstNameCheck
    })

    if(validate){
      axiosRequiredAuthor.post("/user/update-freelancer-info", null, {
        params: {
            lastName: profileDialog.lastName,
            firstName: profileDialog.firstName
        }
      })
      .then(()=> {
          dispatch(closeProfileDialog());
          window.location.reload();
      })
      .catch(()=> {
          // todo
      });
    }
    
  }

  return (
    <Dialog
      classes={{
        paper: "editMainSkillForm",
      }}
      open={profileDialog.isOpen && profileDialog.kind === "NAME"}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="formTitle">Cập nhật thông tin</div>
      <div className="row">
        <div className="col">
          <div className="form-item">
            <label htmlFor="firstName" className="form-item-label">
              Tên
            </label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              name="firstName"
              className="form-item-input"
              value={profileDialog.firstName}
              onChange={onChangeInput}
            />
            <span className="error">{error.firstName}</span>
          </div>
        </div>
        <div className="col">
          <div className="form-item">
            <label htmlFor="lastName" className="form-item-label">
              Họ
            </label>
            <input
              ref={lastNameRef}
              type="text"
              id="lastName"
              name="lastName"
              className="form-item-input"
              value={profileDialog.lastName}
              onChange={onChangeInput}
            />
            <span className="error">{error.lastName}</span>
          </div>
        </div>
      </div>
      <div className="btnGroup d-flex">
        <button className="btn btnSubmit" onClick={saveInput}>
          Lưu
        </button>
        <button className="btn btnCancel" onClick={handleClose}>
          Huỷ
        </button>
      </div>
    </Dialog>
  );
}

export default EditNameDialog;
