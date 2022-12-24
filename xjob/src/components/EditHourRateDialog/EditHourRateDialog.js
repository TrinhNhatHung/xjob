import { Dialog } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./editHourRateDialog.css";
import { closeHourRateDialog, setHourRateDialog } from '../../reducer/editHourRateDialog';
import { useRef } from 'react';
import axiosRequiredAuthor from '../../api/axiosRequiredAuthor';

function EditHourRateDialog() {
    const hourRateDialog = useSelector(state => state.hourRateDialog);
    const dispatch =  useDispatch();
    const [error, setError] = useState({
        hourlyRate: null
    })
    const handleClose = ()=> {
        dispatch(closeHourRateDialog());
        setError({
            hourlyRate: null
        })
    }

    const onChangeInput = (event)=> {
        let value = event.target.value;
        dispatch(setHourRateDialog({
            hourlyRate: value
        }));
    }

    const hourlyRateRef = useRef();
    const saveInfo = ()=> {
        hourlyRateRef.current.classList.remove("borderError");
        let validate = true;

        let hourlyRateCheck = null;
        if (hourRateDialog.hourlyRate === null || hourRateDialog.hourlyRate === undefined || hourRateDialog.hourlyRate === ""){
            hourlyRateCheck = "Bắt buộc";
            hourlyRateRef.current.classList.add("borderError");  
            validate = false;         
        }

        setError({
            ...error,
            hourlyRate: hourlyRateCheck
        })
        if (validate){
            axiosRequiredAuthor.post("/user/update-freelancer-info", null, {
                params: {
                    hourlyRate: hourRateDialog.hourlyRate
                }
            })
            .then(()=> {
                dispatch(closeHourRateDialog());
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
        paper: "editHourlyRateForm"
      }}
      open={hourRateDialog.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="formTitle">Cập nhật chi phí một giờ</div>
      <div className="form-item">
        <label htmlFor="hourlyRate" className="form-item-label">Chi phí một giờ</label>
        <input 
            ref={hourlyRateRef}
            type="number" id="hourlyRate" name="hourlyRate" className="form-item-input" 
            value={hourRateDialog.hourlyRate}
            onChange={onChangeInput}
        />
        <span className="error">{error.hourlyRate}</span>
      </div>
      <div className="btnGroup d-flex justify-content-end">
        <button className="btn btnSubmit" onClick={saveInfo}>Lưu</button>
        <button className="btn btnCancel" onClick={handleClose}>Huỷ</button>
      </div>
    </Dialog>
    );
}

export default EditHourRateDialog;