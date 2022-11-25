import React, { useRef, useState } from "react";
import "./proposalDialog.css";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {closeDialog} from "../../reducer/proposalDialog";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import {textToHtml} from "../../util/HtmlTagUtil";

function ProposalDialog() {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.proposalDialog);

  const handleClose = () => {
    dispatch(closeDialog());
    setInput({
      ...input,
      letter: null
    });
  };

  const [input, setInput] = useState({
    letter: null
  });

  const handleChangeInput = (event)=> {
    let name = event.target.name;
    let value = event.target.value;
    setInput({
      ...input,
      [name]: value
    })
  }

  const letterRef = useRef();
  const [error, setError] = useState({
    letter: null
  });

  const post = useSelector(state => state.detailJobDrawer.post);

  const submitProposal = ()=> {
    letterRef.current.classList.remove("borderError");
    let validate = true;
    let letterCheck = null;
    if (input.letter === null || input.letter === undefined || input.letter === ""){
      letterCheck = "Please enter the cover letter";
      letterRef.current.classList.add("borderError");
      validate = false;
    }

    setError({
      ...error,
      letter: letterCheck
    })

    if (validate){
      axiosRequiredAuthor.post("/proposal/post-proposal", null, {
        params : {
          letter : textToHtml(input.letter),
          jobId : post.jobId
        }
      })
      .then(()=> {
        setInput({
          ...input,
          letter: null
        });
        dispatch(closeDialog());
      })
      .catch(()=> {
        setError({
          ...error,
          letter: "Submit proposal failed"
        })
      })
    }
  }
  return (
    <Dialog
      classes={{
        paper: "proposalForm"
      }}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="form-item d-flex flex-column">
        <label className="form-item-label" htmlFor="letter">Cover Letter</label>
        <textarea
            ref={letterRef}
            className="form-item-input" 
            name="letter" 
            id="letter" 
            spellCheck={false}
            value={input.letter}
            onChange={handleChangeInput}
          />
          <span className="error">{error.letter}</span>
      </div>
      <div className="btnGroup d-flex mt-4">
        <button className="btn btnSubmit" onClick={submitProposal}>Submit a Proposal</button>
        <button className="btn btnCancel" onClick={handleClose}>Cancel</button>
      </div>
    </Dialog>
  );
}

export default ProposalDialog;
