const Filter = () =>{
  return(
    <>
      <h2>Issues</h2>   
        <hr/>
        <div class="btn-group">
          <button type="button" class="btn btn-default active">162 Open</button>
          <button type="button" class="btn btn-default">95,721 Closed</button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            Sort: <strong>Newest</strong> <span class="caret"></span>
          </button>
          <ul class="dropdown-menu fa-padding" role="menu">
            <li><a href="#"><i class="fa fa-check"></i> Newest</a></li>
            <li><a href="#"><i class="fa"> </i> Oldest</a></li>
            <li><a href="#"><i class="fa"> </i> Recently updated</a></li>
            <li><a href="#"><i class="fa"> </i> Least recently updated</a></li>
            <li><a href="#"><i class="fa"> </i> Most commented</a></li>
            <li><a href="#"><i class="fa"> </i> Least commented</a></li>
          </ul>
      </div>
      <button type="button" class="btn btn-success pull-right" data-toggle="modal" data-target="#newIssue">New Issue</button>
    </>
  );
}

export default Filter;