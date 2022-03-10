import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Filter = () =>{
  const [filteredtickets, setfilteredtickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState(0);
  const dispatch = useDispatch()

  const { tickets, opentickets, closetickets } = useSelector( state => {
    return {
      tickets: [...state.tickets],
      opentickets: state.opentickets, 
      closetickets: state.closetickets
    }
  })

  const changefilter = e => {
    if(e.target.dataset.status === filterStatus){
      setFilterStatus(0)
      setfilteredtickets([...tickets])
    }
    else{
      setFilterStatus(e.target.dataset.status)
      if(e.target.dataset.status === '1'){
        setfilteredtickets([...tickets.filter(ticket => ticket.status!=='5')])
      }else{
        setfilteredtickets([...tickets.filter(ticket => ticket.status==='5')])
      }
    }
  }
  useEffect(() => {
    dispatch({
      type:'CHANGE_FILTER_LIST', 
      filterList: filteredtickets
    })

  }, [filteredtickets, dispatch])
  return(
    <>
      <h2>Issues</h2>   
        <hr/>
        <div className='btn-group'>
          <button 
              type='button' 
              data-status='1' 
              className={`btn btn-default${filterStatus==='1'?' active':''}`} 
              onClick={changefilter}
          >
            {parseInt(opentickets)} Opened
          </button>

          <button 
            type='button' 
            data-status='2' 
            className={`btn btn-default${filterStatus==='2'?' active':''}`} 
            onClick={changefilter}
          >
            {parseInt(closetickets)} Closed
          </button>
        </div>
        <div className='btn-group'>
          <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown'>
            Sort: <strong>Newest</strong> <span className='caret'></span>
          </button>
          <ul className='dropdown-menu fa-padding' role='menu'>
            <li><a href='#'><i className='fa fa-check'></i> Newest</a></li>
            <li><a href='#'><i className='fa'> </i> Oldest</a></li>
            <li><a href='#'><i className='fa'> </i> Recently updated</a></li>
            <li><a href='#'><i className='fa'> </i> Least recently updated</a></li>
          </ul>
      </div>
      <button type='button' className='btn bg-secondry-bv text-light pull-right' data-toggle='modal' data-target='#newIssue'>New Issue</button>
    </>
  );
}

export default Filter;