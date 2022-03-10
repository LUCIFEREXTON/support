import ListGroup from './ListGroup'
import ViewTicket from './ViewTicket'
const AllTickets = () =>{
  return(
    <><div className='padding'></div>
			<div className='row'>				
      <div className='col-md-12'>
        <ListGroup />												
        <ViewTicket />					
      </div>				
    </div></>
  );
}

export default AllTickets;