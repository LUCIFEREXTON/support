const Layout = ({children}) =>{
  return(
    <div className="container">
			<section className="content">
				<div className="row">
					<div className="col-md-12">
						<div className="grid support-content">
							<div className="grid-body">
                {children}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
  );
}

export default Layout;