import { useDispatch } from 'react-redux'
const ListItem = ({id, status, subject, createdAt, updatedAt}) => {
  const dispatch = useDispatch()
  let statusValue = ''
  if( status === 5 ){
    statusValue =  <span className='label label-danger'>Closed</span>
  }else{
    statusValue =  <span className='label label-success'>Open</span> 
  }
  const onClickHandler = () =>{
    dispatch({ type: 'SHOW_TICKET', id})
  }
  return(
    <li className='list-group-item' data-toggle='modal' data-target='#issue' onClick={onClickHandler}>
      <div className='media'>
        <i className='fa fa-cog pull-left'></i>
        <div className='media-body'>
          <strong>{subject}</strong> {statusValue}<span className='number pull-right'># {id}</span>
          <p className='info'>Raised On: {createdAt} | Updated At: {updatedAt}</p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;