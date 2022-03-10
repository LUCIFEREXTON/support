import { useState } from "react";
const Filter = () =>{
  const [filterStatus, setFilterStatus] = useState(0)
  const changefilter = e => {
    if(e.target.dataset.status === filterStatus)
      setFilterStatus(0)
    else
      setFilterStatus(e.target.dataset.status)
  }
  return(
    <>
      <h2>Issues</h2>   
        <hr/>
        <div className='btn-group'>
          <button type='button' data-status='1' className={`btn btn-default${filterStatus==='1'?' active':''}`} onClick={changefilter}>162 Open</button>
          <button type='button' data-status='2' className={`btn btn-default${filterStatus==='2'?' active':''}`} onClick={changefilter}>95,721 Closed</button>
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