import axios from "axios";
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import ConversationGroup from "./ConversationGroup";

const Viewticket = () =>{
  const id = useSelector( state => state.selectedTicketId )
  const [ticket, setticket] = useState({})
  const [conversationList, setConversationList] = useState([]);
  
  const statusChangeHandler = (status) => {
      axios.put(`/tickets/${id}`, { status })
      .then(res => setticket({...res.data}))
      .catch(error => console.log(error));
  }

  const fetchConversation = () => {
    axios.get(`/tickets/${id}/conversations`)
    .then(res => setConversationList([...res.data]))
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
            <form action='#' method='post'>
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
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'><i className='fa fa-times'></i> Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewticket;