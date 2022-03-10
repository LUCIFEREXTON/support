import axios from "axios";
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

const Viewticket = () =>{
  const id = useSelector( state => state.selectedTicketId )
  const [ticket, setticket] = useState({})

  let statusValue = ''
  if( ticket.status === 5 ){
    statusValue =  <span className="badge bg-red pull-left">Status Closed</span> 
  }else{
    statusValue =  <span className="badge bg-green pull-left">Status Open</span>
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
                <button type="button" className="btn btn-sm bg-secondry-bv text-light pull-right">Close Ticket</button>
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
                <div className='row support-content-comment'>
                  <div className='col-md-2'>
                    <img src='assets/img/user/avatar02.png' className='img-circle' alt='' width='50'/>
                  </div>
                  <div className='col-md-10'>
                    <p>Posted by <a href='#'>ehernandez</a> on 16/06/2014 at 14:12</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a href='#'><span className='fa fa-reply'></span> &nbsp;Post a reply</a>
                  </div>
                </div>
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