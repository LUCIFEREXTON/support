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
			const res = await axios.get(`/tickets?email=${requester_email}`)
			console.log(res.data)
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
			<TicketCreation/>			
			<AllTickets/>
		</Layout>
	)
}

export default MainPage
