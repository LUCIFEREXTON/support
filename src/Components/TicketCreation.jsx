import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

const TicketCreation = ({ email }) =>{
  const [subject, changeSubject] = useState('');
  const [description, changeDescription] = useState('');
  let tickets = useSelector( state => state.tickets)
	const dispatch = useDispatch()
  const onSubjectChange = event => {
    changeSubject(event.target.value);
  }

  const onDescriptionChange = event => {
    changeDescription(event.target.value);
  }

  const onTicketCreate = () => {
    axios.post(`/tickets`, { subject, description, email, priority: 1, status: 2 })
      .then(res => {
        console.log(res.data);
        dispatch({type:'UPDATE_TICKETS', tickets: [...tickets,res.data]})
      })
      .catch(error => console.log(error));
  }
  return(
    <div className='modal fade' id='newIssue' tabIndex='-1' role='dialog' aria-labelledby='newIssue' aria-hidden='true'>
      <div className='modal-wrapper'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header bg-blue'>
              <button type='button' className='close' data-dismiss='modal' aria-hidden='true'>×</button>
              <h4 className='modal-title'><i className='fa fa-pencil'></i> Create New Issue</h4>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <input name='subject' type='text' className='form-control' placeholder='Subject' onChange={onSubjectChange}/>
              </div>
              <div className="form-group">
                <textarea name="message" className="form-control" placeholder="Please detail your issue or question" style={{height: '120px'}} onChange={onDescriptionChange}/>
              </div>
              <div className='form-group'>
                <input type='file' name='attachment'/>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'><i className='fa fa-times'></i> Discard</button>
              <button type='submit' className='btn btn-primary pull-right' onClick={onTicketCreate} data-dismiss='modal'><i className='fa fa-pencil'></i> Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCreation;