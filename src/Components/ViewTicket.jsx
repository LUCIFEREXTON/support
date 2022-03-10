const Viewticket = () =>{
  return(
    <div className="modal fade" id="issue" tabIndex="-1" role="dialog" aria-labelledby="issue" aria-hidden="true">
      <div className="modal-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-blue">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 className="modal-title"><i className="fa fa-cog"></i> Add drag and drop config import closes</h4>
            </div>
            <form action="#" method="post">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-2">
                    <img src="assets/img/user/avatar01.png" className="img-circle" alt="" width="50"/>
                  </div>
                  <div className="col-md-10">
                    <p>Issue <strong>#13698</strong> opened by <a href="#">jqilliams</a> 5 hours ago</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
                <div className="row support-content-comment">
                  <div className="col-md-2">
                    <img src="assets/img/user/avatar02.png" className="img-circle" alt="" width="50"/>
                  </div>
                  <div className="col-md-10">
                    <p>Posted by <a href="#">ehernandez</a> on 16/06/2014 at 14:12</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a href="#"><span className="fa fa-reply"></span> &nbsp;Post a reply</a>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times"></i> Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewticket;