import './style.css'
import Layout from '../Components/Layout'
import AllTickets from '../Components/AllTickets'
import TicketCreation from '../Components/TicketCreation'
import Filter from '../Components/Filter'
const MainPage = () =>{
	return(
		<Layout>
			<Filter />								
			<TicketCreation/>			
			<AllTickets/>
		</Layout>
	)
}

export default MainPage
