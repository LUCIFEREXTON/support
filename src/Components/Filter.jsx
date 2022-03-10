const Filter = () =>{
  return(
    <>
      <h2>Issues</h2>   
        <hr/>
        <div className="btn-group">
          <button type="button" className="btn btn-default active">162 Open</button>
          <button type="button" className="btn btn-default">95,721 Closed</button>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
            Sort: <strong>Newest</strong> <span className="caret"></span>
          </button>
          <ul className="dropdown-menu fa-padding" role="menu">
            <li><a href="#"><i className="fa fa-check"></i> Newest</a></li>
            <li><a href="#"><i className="fa"> </i> Oldest</a></li>
            <li><a href="#"><i className="fa"> </i> Recently updated</a></li>
            <li><a href="#"><i className="fa"> </i> Least recently updated</a></li>
            <li><a href="#"><i className="fa"> </i> Most commented</a></li>
            <li><a href="#"><i className="fa"> </i> Least commented</a></li>
          </ul>
      </div>
      <button type="button" className="btn btn-success pull-right" data-toggle="modal" data-target="#newIssue">New Issue</button>
    </>
  );
}

export default Filter;