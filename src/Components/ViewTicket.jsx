import axios from "axios";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ConversationGroup from "./ConversationGroup";

const Viewticket = () =>{
  const id = useSelector( state => state.selectedTicketId )
  const [ticket, setticket] = useState({})
  const [reply, changeReply] = useState('');
  let conversationList = useSelector(state => state.conversationList);
  let tickets = useSelector( state => state.tickets);
  const dispatch = useDispatch();
  
  const updateStatusOfTicket = (ticket) => {
    tickets.map(currentTicket => (currentTicket.id === ticket.id ? Object.assign(currentTicket, ticket) : currentTicket));
    dispatch({type:'UPDATE_TICKETS', tickets});
  }

  const statusChangeHandler = (status) => {
      axios.put(`/tickets/${id}`, { status })
      .then(res => {
        setticket({...res.data});
        updateStatusOfTicket(res.data);
      })
      .catch(error => console.log(error));
  }

  const fetchConversation = () => {
    axios.get(`/tickets/${id}/conversations`)
    .then(res => dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...res.data]}))
    .catch(error => console.log(error));
  }

  const onReplyChange = event => {
    changeReply(event.target.value);
  }

  const onReplySubmit = () => {
      axios.post(`/tickets/${id}/reply_to_forward`, { body: reply, to_emails: ["support@utkarsh-help.freshdesk.com"], user_id: ticket.requester_id})
      .then(res => dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...conversationList, res.data]}))
      .catch(error => console.log(error));
  }

  let statusValue = ''
  if( ticket.status === 5 ){
    statusValue =  <span className="badge bg-red pull-left">Status Closed</span> 
  }else{
    statusValue =  <span className="badge bg-green pull-left">Status Open</span>
  }

  let statusChangeButton = ''
  if( ticket.status === 5 ){
    statusChangeButton =  <button type="button" className="btn btn-sm bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(2)}>Reopen Ticket</button>
  }else{
    statusChangeButton =  <button type="button" className="btn btn-sm bg-secondry-bv text-light pull-right" onClick={() => statusChangeHandler(5)}>Close Ticket</button>
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

  },[id])

  return(
    <div className="modal fade" id="issue" tabIndex="-1" role="dialog" aria-labelledby="issue" aria-hidden="true">
      <div className="modal-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-blue">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 className="modal-title"><i className="fa fa-cog"></i> {ticket.subject}</h4>
                {statusValue}
                {statusChangeButton}
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-md-2'>
                  <img src='assets/img/user/avatar01.png' className='img-circle' alt='' width='50'/>
                </div>
                <div className='col-md-10'>
                  <p>Issue <strong>#{ticket.id}</strong> Raised On: {ticket.created_at} | Updated At: {ticket.updated_at}</p>
                  <p>{ticket.description_text}</p>
                </div>
              </div>
              <ConversationGroup user_id={ticket.requester_id} conversationList={conversationList} />
              <div class="row">
                {/* <a href='#'><span className='fa fa-reply'></span> &nbsp;Post a reply</a> */}
                <div className="form-group">
                  <textarea name="reply" className="form-control" placeholder="Write Reply" style={{height: '120px'}} onChange={onReplyChange}/>
                </div>
                {/* <div class="col-sm-2"> */}
                  <button type="submit" class="btn btn-primary text-left btn-reply" onClick={onReplySubmit}>Reply</button>
                {/* </div> */}
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