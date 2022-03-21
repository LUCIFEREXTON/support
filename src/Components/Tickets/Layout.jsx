const Layout = ({children}) =>{
  return(
		<div className='dashboard-screen-card'>
			<div className='container'>
				<section className='content'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='grid support-content bg-primary-bv'>
								<div className='grid-body'>
									{children}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
  );
}

export default Layout
