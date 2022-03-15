import { useEffect, useCallback } from 'react';
import './style.css';
import Layout from '../Components/Layout';
import AllTickets from '../Components/AllTickets';
import TicketCreation from '../Components/TicketCreation';
import Filter from '../Components/Filter';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const MainPage = () =>{
	const requester_email = useSelector( state => state.user?.email)
	const dispatch = useDispatch()

	const gettickets = useCallback(async()=>{
		try {
			const res = await axios.get(`/tickets?order_by=updated_at&email=${requester_email}`)
			dispatch({type:'UPDATE_TICKETS', tickets: [...res.data]})
		} catch (error) {
			console.log(error)
		}
	}, [requester_email, dispatch])

	useEffect(()=>{
		gettickets()
	},[gettickets])

	return(
		<Layout>
			<Filter />								
			<TicketCreation email={requester_email}/>	
			<AllTickets/>
		</Layout>
	)
}

export default MainPage
