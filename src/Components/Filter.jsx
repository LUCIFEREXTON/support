import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

const Filter = () =>{
  const [filteredtickets, setfilteredtickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState('2');
  const [selectedtype, setselectedtype] = useState('Newest')
  const [dropdown, setdropdown] = useState(false)
  const dispatch = useDispatch()

  const toggleDropdown = () => setdropdown(!dropdown)

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
		}
		setFilterStatus(e.target.dataset.status)
  }

	const sorting = (e) => {
    if( e.target.dataset.type === selectedtype ){ 
      toggleDropdown()
      return
    }
    switch(e.target.dataset.type){
      case 'Newest':{
        setselectedtype('Newest')
        break
      }
      case 'Recently updated':{
        setselectedtype('Recently updated')
        break
      }
      default: break
    }
    toggleDropdown()
	}

  useEffect(() => {
    if (filterStatus === '1'){
      setfilteredtickets([...tickets.filter(ticket => ticket.status!==5)])
    }else{
			setfilteredtickets([...tickets])
    }
  },[filterStatus])

  useEffect(() => {
    if (selectedtype === 'Newest'){
      filtered.sort((a, b)=> new Date(b.created_at) - new Date(a.created_at))
      setfilteredtickets([...filtered])
    }else if(selectedtype === 'Recently updated'){
			setfilteredtickets([...filtered])
    }
  },[selectedtype])

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
          <button type='button' className='btn btn-default dropdown-toggle' onClick={toggleDropdown}>
            Sort: <strong>{selectedtype}</strong> <span className='caret'></span>
          </button>
          {dropdown && <ul className='dropdown-menu fa-padding' role='menu'>
            <li data-type='Newest' className='filter-item' onClick={sorting}><i className={`fa${selectedtype === 'Newest'?' fa-check':''}`}></i> Newest</li>
            <li data-type='Recently updated' className='filter-item' onClick={sorting}><i className={`fa${selectedtype === 'Recently updated'?' fa-check':''}`}> </i> Recently updated</li>
          </ul>}
      </div>
      <Link to='/ticket/new' className='btn bg-secondry-bv text-light pull-right'>New Issue</Link>
    </>
  );
}

export default Filter;
