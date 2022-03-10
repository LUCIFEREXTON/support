const ListItem = () =>{
  return(
    <li class="list-group-item" data-toggle="modal" data-target="#issue">
      <div class="media">
        <i class="fa fa-cog pull-left"></i>
        <div class="media-body">
          <strong>Add drag and drop config import closes</strong> <span class="label label-danger">IMPORTANT</span><span class="number pull-right"># 13698</span>
          <p class="info">Opened by <a href="#">jwilliams</a> 5 hours ago <i class="fa fa-comments"></i> <a href="#">2 comments</a></p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;