const initialState = {
  user:{
      name: 'User',
      email:'contact10@freshdesk.com'
  },
  tickets: [],
  filterList: [],
  total: 0,
  opentickets: 0,
  closetickets: 0,
}

const ticket_open_status = [2, 3, 4]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TICKETS':{
      
      let open = 0, closed = 0; 
      const total = action.tickets.reduce((total, ticket)=>{
        console.log(ticket_open_status.includes( ticket.status ))
        if(ticket_open_status.includes( ticket.status )) 
          open++;
        else
          closed++
        return total + 1
      }, 0)
      console.log(open, closed, total)
      return {
        ...state,
        total,
        tickets : [...action.tickets],
        filterList: [...action.tickets],
        opentickets: open,
        closeticket: closed
      }
    }
    case 'CHANGE_FILTER_LIST':{
      return {
        ...state,
        filterList: action.filterList
      }
    }
    case 'SHOW_TICKET':{
      return {
        ...state,
        selectedTicketId : action.id
      }
    }
    default:
      return state
  }
}

export default reducer