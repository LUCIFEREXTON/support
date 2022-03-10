const ListItem = () =>{
  return(
    <li className="list-group-item" data-toggle="modal" data-target="#issue">
      <div className="media">
        <i className="fa fa-cog pull-left"></i>
        <div className="media-body">
          <strong>Add drag and drop config import closes</strong> <span className="label label-danger">IMPORTANT</span><span className="number pull-right"># 13698</span>
          <p className="info">Opened by <a href="#">jwilliams</a> 5 hours ago <i className="fa fa-comments"></i> <a href="#">2 comments</a></p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;