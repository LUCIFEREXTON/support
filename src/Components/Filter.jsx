import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Filter = () =>{
  const [filteredtickets, setfilteredtickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState('2');
  const [selectedtype, setselectedtype] = useState('Recently updated')
  const dispatch = useDispatch()

  const { tickets, filtered, opentickets, total } = useSelector( state => {
    return {
      tickets: [...state.tickets],
      filtered: [...state.filterList],
      opentickets: state.opentickets, 
      total: state.total
    }
  })

  const changefilter = e => {
		if (e.target.dataset.status === filterStatus){
			return
		}else if(e.target.dataset.status === '1'){
      setfilteredtickets([...tickets.filter(ticket => ticket.status!==5)])
    }else{
      setfilteredtickets([...tickets])
		}
		setFilterStatus(e.target.dataset.status)
  }

	const sorting = (e) => {
    if( e.target.dataset.type === selectedtype ) return
    switch(e.target.dataset.type){
      case 'Newest':{
        filtered.sort((a, b)=> new Date(b.created_at) - new Date(a.created_at))
        setfilteredtickets([...filtered])
        setselectedtype('Newest')
        break
      }
      case 'Recently updated':{
        setfilteredtickets([...filtered])
        setselectedtype('Recently updated')
        break
      }
      default: return
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
            {parseInt(total)} All
          </button>
        </div>
        <div className='btn-group'>
          <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown'>
            Sort: <strong>{selectedtype}</strong> <span className='caret'></span>
          </button>
          <ul className='dropdown-menu fa-padding' role='menu'>
            <li data-type='Newest' className='filter-item' onClick={sorting}><i className={`fa${selectedtype === 'Newest'?' fa-check':''}`}></i> Newest</li>
            <li data-type='Recently updated' className='filter-item' onClick={sorting}><i className={`fa${selectedtype === 'Recently updated'?' fa-check':''}`}> </i> Recently updated</li>
          </ul>
      </div>
      <button type='button' className='btn bg-secondry-bv text-light pull-right' data-toggle='modal' data-target='#newIssue'>New Issue</button>
    </>
  );
}

export default Filter;
