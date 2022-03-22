import axios from "axios";
import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ConversationGroup from "../Components/Tickets/ConversationGroup";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, Link, useNavigate } from "react-router-dom";

const Ticket = () => {
  const [openreply, setopenreply] = useState(false)
  const [ticket, setticket] = useState({})
  const reduxticket = useSelector( state => state.ticket)
  const { id } = reduxticket
  const [reply, changeReply] = useState('');
  const [files, changeFiles] = useState([]);
  const formRef = useRef();
  const fileUploadRef = useRef();
  let conversationList = useSelector(state => state.conversationList);
  const dispatch = useDispatch()
  let statusValue = ''
  let statusChangeButton = ''
  if( ticket?.status === 5 ){
    statusValue =  <span className="badge bg-red ticket-status">Status Closed</span> 
  }else{
    statusValue =  <span className="badge bg-green ticket-status">Status Open</span>
  }          
  if( ticket?.status === 5 ){
    statusChangeButton =  <button type="button" className="btn bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(2)}><strong>Reopen Ticket</strong></button>
  }else{
    statusChangeButton =  <button type="button" className="btn bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(5)}><strong>Ticket Resolve</strong></button>
  }

  const statusChangeHandler = async(status) => {
    try{
      axios.put(`/tickets/${id}`, { status })
      .then(res => {
        setticket({...res.data})
        dispatch({type:'UPDATE_STATUS', ticket: {...res.data}})
      })
      .catch(error => console.log(error))
    }catch(e){
      console.log(e)
    }
  }

  const onReplyChange = event => {
    changeReply(event.target.value);
  }

  const onReplySubmit = () => {
    let formData = new FormData();
    formData.append( "body", reply);
    formData.append("private", false);
    formData.append("notify_emails[]", "ajaykanyal11@gmail.com");
    formData.append("user_id", ticket.requester_id);
    files.forEach(file => formData.append("attachments[]",file));
    axios.post(`/tickets/${id}/notes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...conversationList, res.data]})
      setopenreply(false)
      changeReply('')
      changeFiles([])
      formRef.current.reset()
    })
    .catch(error => console.log(error));
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
      <div className="modal-header bg-primary-bv text-light">
        <div className="ticket-header">
        <h4 className="modal-title"><i className="fa fa-cog"></i> {ticket?.subject} [#{ticket?.id}] {statusValue}</h4>
        <div className="buttons">
          <div className="nav-links pull-right">
            {statusChangeButton}
          </div>
        </div>
        </div>
      </div>
      <div className='modal-body'>
        {ticket?.id && <ConversationGroup user_id={ticket?.requester_id} conversationList={[ticket, ...conversationList]} />}
        <div className="reply">
          <div className="replybtn bg-secondry-bv text-light" onClick={()=>{setopenreply(!openreply);changeReply('');changeFiles([]);formRef.current.reset();}}><span className='fa fa-reply'></span> &nbsp;{openreply?'Cancel reply':'Post a reply'}</div>
          {openreply &&
          <div>  
            <div className="form-group">
              <textarea name="reply" className="form-control" placeholder="Write Reply" style={{height: '120px'}} onChange={onReplyChange} value={reply}/>
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
        </div>
      </div>
    </>
  );
}

export default Ticket;