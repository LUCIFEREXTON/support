import ListGroup from './ListGroup'
import ViewTicket from './ViewTicket'
const AllTickets = () =>{
  return(
    <><div class="padding"></div>
			<div class="row">				
      <div class="col-md-12">
        <ListGroup />												
        <ViewTicket />					
      </div>				
    </div></>
  );
}

export default AllTickets;