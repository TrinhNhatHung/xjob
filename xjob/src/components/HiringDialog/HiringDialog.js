import React, { useRef, useState } from "react";
import "./hiringDialog.css";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeHiringDialog } from "../../reducer/hiringDialog";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import { textToHtml } from "../../util/HtmlTagUtil";

function HiringDialog() {
  const { isOpen, uid, jobId } = useSelector((state) => state.hiringDialog);
  const [letter, setLetter] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeHiringDialog());
    setError(null);
  };

  const onChangeInput = (event) => {
    setLetter(event.target.value);
  };

  const letterRef = useRef();
  const postHiring = () => {
    letterRef.current.classList.remove("borderError");
    let validate = null;
    if (letter === null || letter === undefined || letter === "") {
      validate = "Bắt buộc";
      letterRef.current.classList.add("borderError");
    }

    setError(validate);

    if (validate === null) {
      axiosRequiredAuthor
        .post("/proposal/hiring", null, {
          params: {
            uid: uid,
            jobId: jobId,
            letter: textToHtml(letter),
          },
        })
        .then((response) => {
          dispatch(closeHiringDialog());
        })
        .catch(() => {
          setError("Lưu thất bại");
        });
    }
  };
  return (
    <Dialog
      classes={{
        paper: "hiringDialog",
      }}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="form-item">
        <label htmlFor="letter" className="form-item-label mb-2">
          Thư mời
        </label>
        <textarea
          id="letter"
          type="text"
          className="form-item-input"
          name="letter"
          defaultValue={letter}
          onChange={onChangeInput}
          ref={letterRef}
        />
        <span className="error">{error}</span>
      </div>
      <div className="btnGroup d-flex justify-content-end">
        <button className="btn btnSubmit" onClick={postHiring}>
          Lưu
        </button>
        <button className="btn btnCancel" onClick={handleClose}>
          Huỷ
        </button>
      </div>
    </Dialog>
  );
}

export default HiringDialog;
