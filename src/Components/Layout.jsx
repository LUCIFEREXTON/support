const Layout = ({children}) =>{
  return(
    <div class="container">
			<section class="content">
				<div class="row">
					<div class="col-md-12">
						<div class="grid support-content">
							<div class="grid-body">
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