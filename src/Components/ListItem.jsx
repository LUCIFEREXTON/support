import { useDispatch } from 'react-redux'
import { formatDate } from '../helperFunction.js'


const ListItem = ({id, status, subject, createdAt, updatedAt}) => {
  const dispatch = useDispatch()
  let statusValue = ''
  if( status === 5 ){
    statusValue =  <span className='label label-danger pull-right'>Closed</span>
  }else{
    statusValue =  <span className='label label-success pull-right'>Open</span> 
  }
  const onClickHandler = () =>{
    dispatch({ type: 'SHOW_TICKET', id})
  }
  return(
    <li className='list-group-item' data-toggle='modal' data-target='#issue' onClick={onClickHandler}>
      <div className='media'>
        <i className='fa fa-cog pull-left'></i>
        <div className='media-body'>
          <strong>{subject}</strong>  <span className='number'>#{id}</span> {statusValue}
						<p className='info'><small>Raised On: {formatDate(new Date(createdAt))} | Updated At: {formatDate(new Date(updatedAt))}</small></p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
