import { useEffect, useCallback } from 'react';
import './style.css';
import Layout from '../Components/Tickets/Layout';
import AllTickets from '../Components/Tickets/AllTickets';
import Filter from '../Components/Tickets/Filter';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import CreateTicket from './CreateTicket';
import Ticket from './Ticket';
import Faq from './Faq';

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
		<Routes>
			<Route path="/ticket/new" element={<CreateTicket/>} />
			<Route path="/ticket/:id" element={<Ticket/>} />
			<Route path="/faq" element={<Faq/>} />
			<Route 
				path="/"
				element={
					<Layout>
						<Filter />
						<AllTickets/>
					</Layout>
				}
			/>
		</Routes>
	)
}

export default MainPage
