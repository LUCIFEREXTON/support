import ListGroup from './ListGroup'
import Pagination from './Pagination';

const AllTickets = () =>{
  return(
    <>
			<div className='row'>				
      <div className='col-md-12'>
        <ListGroup />				
      </div>				
      </div>
      <Pagination/>
    </>
  );
}

export default AllTickets;