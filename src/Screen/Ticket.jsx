import axios from "axios";
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ConversationGroup from "../Components/Tickets/ConversationGroup";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, Link, useNavigate } from "react-router-dom";

const Ticket = () =>{
  const [openreply, setopenreply] = useState(false)
  const { id } = useParams()
  const [ticket, setticket] = useState({})
  const [reply, changeReply] = useState('');
  let conversationList = useSelector(state => state.conversationList);
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    statusChangeButton =  <button type="button" className="btn bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(5)}><strong>Close Ticket</strong></button>
  }

  const statusChangeHandler = (status) => {
      axios.put(`/tickets/${id}`, { status })
      .then(res => {
        setticket({...res.data});
        dispatch({type:'UPDATE_STATUS', ticket: res.data});
      })
      .catch(error => console.log(error));
  }

  const fetchConversation = useCallback(() => {
    axios.get(`/tickets/${id}/conversations`)
    .then(res => dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...res.data]}))
    .catch(error => console.log(error));
  }, [id, dispatch])

  const onReplyChange = event => {
    changeReply(event.target.value);
  }

  const onReplySubmit = () => {
      axios.post(`/tickets/${id}/reply_to_forward`, { body: reply, to_emails: ["support@utkarsh-help.freshdesk.com"], user_id: ticket.requester_id})
      .then(res => {
        dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...conversationList, res.data]})
        setopenreply(false)
        changeReply('')
      })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    if (id) {
      (
        async () => {
          try {
            const res = await axios.get(`/tickets/${id}`)
            setticket({...res.data})
          } catch (error) {
            console.log(error)
          }
        }
      )()
      fetchConversation();
    }
  },[id, fetchConversation])
  
  return(
    <>
      <div className="modal-header bg-primary-bv text-light">
        <div className="ticket-header">
        <h4 className="modal-title"><i className="fa fa-cog"></i> {ticket?.subject} [#{ticket?.id}] {statusValue}</h4>
        <div className="buttons">
          <div className="nav-links pull-right">
            <Link to='/faq' className='btn bg-secondry-bv text-light'><strong>FAQs</strong></Link>
            <div className="btn bg-secondry-bv text-light" onClick={()=>{navigate(-1)}}><strong>Back</strong></div>
            {statusChangeButton}
          </div>
        </div>
        </div>
      
      </div>
      <div className='modal-body'>
        {ticket?.id && <ConversationGroup user_id={ticket?.requester_id} conversationList={[ticket, ...conversationList]} />}
        <div className="reply">
          <div className="replybtn bg-secondry-bv text-light" onClick={()=>{setopenreply(!openreply);changeReply('');}}><span className='fa fa-reply'></span> &nbsp;{openreply?'Cancel reply':'Post a reply'}</div>
          {openreply &&
          <div>  
            <div className="form-group">
              <textarea name="reply" className="form-control" placeholder="Write Reply" style={{height: '120px'}} onChange={onReplyChange} value={reply}/>
            </div>
            <button type="submit" className="btn btn-primary text-left btn-reply" onClick={onReplySubmit}>Reply</button>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Ticket;