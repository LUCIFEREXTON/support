const ListItem = ({id, status, subject, createdAt, updatedAt}) => {
  return(
    <li className='list-group-item' data-toggle='modal' data-target='#issue'>
      <div className='media'>
        <i className='fa fa-cog pull-left'></i>
        <div className='media-body'>
          <strong>{subject}</strong> <span className='label label-danger'>{status}</span><span className='number pull-right'># {id}</span>
          <p className='info'>Raised On: {createdAt} | Updated At: {updatedAt}</p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;