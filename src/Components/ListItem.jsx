import { formatDate } from '../helperFunction.js'
import { useNavigate } from 'react-router-dom'

const ListItem = ({id, status, subject, createdAt, updatedAt}) => {
  const history = useNavigate()
  let statusValue = ''
  if( status === 5 ){
    statusValue =  <span className='label label-danger pull-right'>Closed</span>
  }else{
    statusValue =  <span className='label label-success pull-right'>Open</span> 
  }
  const onClickHandler = () =>{
    history(`/ticket/${id}`)
  }
  return(
    <li className='list-group-item' onClick={onClickHandler}>
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
