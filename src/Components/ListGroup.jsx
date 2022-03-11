import ListItem from './ListItem'
import { connect }from 'react-redux'

const ListGroup = ({ filterList })=>{
  
  return (
    <ul className='list-group fa-padding'>
      {filterList.map(ticket=>(
        <ListItem 
          key={ticket.id} 
          id={ticket.id} 
          subject={ticket.subject} 
          status={ticket.status} 
          createdAt={ticket.created_at} 
          updatedAt={ticket.updated_at}
        />
      ))}
    </ul>
  )
}

const mapStateToProps = (state)=>{
  return {
    filterList: state.filterList
  }
}



export default connect(mapStateToProps)(ListGroup);
