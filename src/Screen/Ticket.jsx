import axios from "axios";
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ConversationGroup from "../Components/Tickets/ConversationGroup";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

const Ticket = () => {
  const [openreply, setopenreply] = useState(false)
  const [ticket, setticket] = useState({})
  const reduxticket = useSelector( state => state.ticket)
  const { id } = reduxticket
  const [files, changeFiles] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const formRef = useRef();
  const fileUploadRef = useRef();
  let conversationList = useSelector(state => state.conversationList);
  const dispatch = useDispatch()
  let statusValue = ''
  let statusChangeButton = ''
  if( ticket?.status === 5 ){
    statusValue =  <span className="badge bg-red align-self-center">Status Closed</span> 
  }else{
    statusValue =  <span className="badge bg-green align-self-center">Status Open</span>
  }          
  if( ticket?.status === 5 ){
    statusChangeButton =  <div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(2)}><strong>Reopen Ticket</strong></div>
  }else{
    statusChangeButton =  <div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(5)}><strong>Ticket Resolve</strong></div>
  }

  const statusChangeHandler = async(status) => {
    try{
			axios.put(`/ticket/update/${id}`, { status })
      .then(res => {
        setticket({...res.data})
        dispatch({type:'UPDATE_STATUS', ticket: {...res.data}})
      })
      .catch(error=>{
        dispatch({type:'ERROR', error: error.response.data.message})
      })
    }catch(error){
      dispatch({type:'ERROR', error: error.response.data.message})
    }
  }

  const onReplySubmit = () => {
    if(editorState.getCurrentContent().getPlainText()!==''){
      let formData = new FormData();
      formData.append( "body", draftToHtml(convertToRaw(editorState.getCurrentContent())));
      formData.append("agent_id", ticket.responder_id);
      formData.append("user_id", ticket.requester_id);
      files.forEach(file => formData.append("attachments[]",file));
			axios.post(`/ticket/reply/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...conversationList, res.data]})
        setopenreply(false)
        setEditorState(() => EditorState.createEmpty())
        changeFiles([])
        formRef.current.reset()
      })
      .catch(error=>{
        dispatch({type:'ERROR', error: error.response.data.message})
      })
    }
  }

  const onFilesChange = event => {
    changeFiles([...files, ...event.target.files]);
    formRef.current.reset();
  }

  const removeSelectedFile = (fileName) => {
    changeFiles([...files.filter(file => file.name !== fileName)]);
  }
  
  useEffect(() =>{
    setticket({...reduxticket})
  }, [reduxticket])

  return(
    <>
      <div className="modal-header bg-primary-bv text-light" id='viewTicket'>
        <div className="d-flex">
          <h4 className="modal-title me-2">{ticket?.subject} [#{ticket?.id}]</h4>
          {statusValue}
        </div>
        <div>
          {(ticket?.status === 5)
          ?<div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(2)}><strong>Reopen Ticket</strong></div>
          :<div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(5)}><strong>Ticket Resolve</strong></div>}
        </div>
      </div>
      <div className='modal-body'>
        {ticket?.id && <ConversationGroup user_id={ticket?.requester_id} conversationList={[ticket, ...conversationList]} />}
        {!openreply && <div className="reply">
          <div 
            className="replybtn bg-secondry-bv text-light" 
            onClick={()=>{
              setopenreply(!openreply)
              setEditorState(() => EditorState.createEmpty())
              changeFiles([])
              formRef.current.reset()
              }}
            >
              <span className='fa fa-reply'></span> &nbsp;Reply
            </div>
        </div>}
      </div>
      {openreply && <div className="reply-modal">
        <div className="close-reply" onClick={()=>{
              setopenreply(!openreply)
              setEditorState(() => EditorState.createEmpty())
              changeFiles([])
              formRef.current.reset()
              }}>X</div>
        <div className="form-group">
          <Editor
            name="description"
            className="form-control"
            placeholder="Please detail your issue or question"
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>          
        <form ref={formRef}>
            <div className="mb-3 form-group">
              {
                files?.length  !== 0 && <div name="attachements" className="form-control attachment-container">
                  {
                    files.map((file, ind) => (
                      <div className="attachment-selected" key={ind}>
                        <>{file.name}</>
                        <button type="button" className="file-remove-btn" onClick={() => removeSelectedFile(`${file.name}`)}>x</button>
                      </div>
                    ))
                  }
                </div>
              }
              <button type="button" className="btn btn-primary" onClick={(event) => fileUploadRef.current.click()}>Upload Attachments</button>
              <input 
                type="file"
                ref={fileUploadRef}  
                multiple
                onChange={onFilesChange}
                style={{"display": "none"}} 
              />
            </div>
          </form>
          <button type="submit" className="btn btn-primary text-left btn-reply" onClick={onReplySubmit}>Reply</button>
      </div>}
    </>
  );
}

export default Ticket;
