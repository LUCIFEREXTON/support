import { useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

const TicketCreation = ({ email }) =>{
  const [subject, changeSubject] = useState('');
  const [description, changeDescription] = useState('');
  const [files, changeFiles] = useState([]);
  const formRef = useRef();
  let tickets = useSelector( state => state.tickets)
	const dispatch = useDispatch()
  const onSubjectChange = event => {
    changeSubject(event.target.value);
  }

  const onDescriptionChange = event => {
    changeDescription(event.target.value);
  }

  const onFilesChange = event => {
    changeFiles([...event.target.files]);
  }

  const initialValue = () => {
    console.log("Hello");
    changeSubject('');
    changeDescription('');
    changeFiles([]);
    formRef.current.reset();
  }

  const onTicketCreate = () => {
    let formData = new FormData();
    formData.append( "subject", subject);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("priority", 1);
    formData.append("status", 2);
    files.forEach(file => formData.append("attachments[]",file));
    axios.post(`/tickets`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch({type:'CREATE_TICKET', ticket: res.data})
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
              <form ref={formRef}>
                <div className='form-group'>
                  <input name='subject' type='text' className='form-control' placeholder='Subject' value={subject} onChange={onSubjectChange}/>
                </div>
                <div className="form-group">
                  <textarea name="description" className="form-control" value={description} placeholder="Please detail your issue or question" style={{height: '120px'}} onChange={onDescriptionChange}/>
                </div>
                <div className="mb-3 form-group">
                  <label className="form-label">Upload Attachments</label>
                  <input 
                    id="input-b3" 
                    name="input-b3[]" 
                    type="file" 
                    className="file" 
                    multiple
                    data-show-preview="false" 
                    data-show-upload="false" 
                    data-show-caption="true" 
                    data-msg-placeholder="Select {files} for upload..."
                    onChange={onFilesChange} 
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal' onClick={initialValue}><i className='fa fa-times'></i> Discard</button>
              <button type='submit' className='btn btn-primary pull-right' onClick={() => {onTicketCreate(); initialValue();}} data-dismiss='modal'><i className='fa fa-pencil'></i> Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCreation;
