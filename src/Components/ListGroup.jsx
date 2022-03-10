import { useState, useEffect } from 'react'
import ListItem from './ListItem'
import { connect }from 'react-redux'

const ListGroup = ({ filteredList })=>{
  const [tickets, settickets] = useState([])
  useEffect(()=>{

  }, [filteredList])
  return (
    <ul className='list-group fa-padding'>
      {tickets.map(ticket=>{
        <ListItem key={ticket.id} id={ticket.id} subject={ticket.subject} status={ticket.status} createdAt={ticket.created_at} updatedAt={ticket.updated_at}/>
      })}
    </ul>
  )
}

const mapStateToProps = (state)=>{
  return {
    filteredList: state.filteredList
  }
}



export default connect(mapStateToProps)(ListGroup);