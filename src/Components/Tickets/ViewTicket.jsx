import axios from "axios";
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ConversationGroup from "./ConversationGroup";
import { formatDate } from '../helperFunction'
import parse from 'html-react-parser';
import Attachment from "./Attachment";
import "bootstrap-icons/font/bootstrap-icons.css";

const Viewticket = () =>{
  const [openreply, setopenreply] = useState(false)
  const id = useSelector( state => state.selectedTicketId )
  const [ticket, setticket] = useState(null)
  const [reply, changeReply] = useState('');
  let conversationList = useSelector(state => state.conversationList);
  let user = useSelector( state => state.user);
  const dispatch = useDispatch();

  let statusValue = ''
  let statusChangeButton = ''
  if( ticket?.status === 5 ){
    statusValue =  <span className="badge bg-red pull-left">Status Closed</span> 
  }else{
    statusValue =  <span className="badge bg-green pull-left">Status Open</span>
  }          
  if( ticket?.status === 5 ){
    statusChangeButton =  <button type="button" className="btn btn-sm bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(2)}>Reopen Ticket</button>
  }else{
    statusChangeButton =  <button type="button" className="btn btn-sm bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(5)}>Close Ticket</button>
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
  }, [id])

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
    <div className="modal fade" id="issue" tabIndex="-1" role="dialog" aria-labelledby="issue" aria-hidden="true">
      <div className="modal-wrapper">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary-bv text-light">
              <button type="button" className="close text-light" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 className="modal-title"><i className="fa fa-cog"></i> {ticket?.subject} [#{ticket?.id}]</h4>
                {statusValue}
                {statusChangeButton}
            </div>
            <div className='modal-body'>

            <div className='conversation user'>
              <div className='conv-header'>
                <div className='iconbg'>
                  <div className='icon'>
                    {user.name[0]}
                  </div>
                </div>
                <div className='sender'>
                  <div className='responder'>
                   Ticket Raised by You
                  </div>
                  <div className='date'>
                    Raised On: {formatDate(ticket?.created_at)} | Last Activity: {formatDate(ticket?.updated_at)}
                  </div>
                </div>
              </div>
              <div className='conv-mail'>
                <div className='mail-icon'>
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                </div>
                <div className='mail-body'>
                  <div className='mail-text'>
                    {ticket?.description && parse(ticket?.description)}
                  </div>
                  {ticket?.attachments?.length > 0  &&
                    <div className="all-attachments">
                      {ticket?.attachments.map( attachment => <Attachment key={attachment.id} file={attachment}/>)}
                    </div>
                  }
                </div>
              </div>
            </div>
              <ConversationGroup user_id={ticket?.requester_id} conversationList={conversationList} />
              <div className="row">
                <div style={{cursor:'pointer'}} onClick={()=>{setopenreply(!openreply);changeReply('');}}><span className='fa fa-reply'></span> &nbsp;{openreply?'Cancel reply':'Post a reply'}</div>
                {openreply &&
                <div>  
                  <div className="form-group">
                    <textarea name="reply" className="form-control" placeholder="Write Reply" style={{height: '120px'}} onChange={onReplyChange} value={reply}/>
                  </div>
                  <button type="submit" className="btn btn-primary text-left btn-reply" onClick={onReplySubmit}>Reply</button>
                </div>}
              </div>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'><i className='fa fa-times'></i> Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewticket;
