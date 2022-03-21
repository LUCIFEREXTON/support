const Modal = ({children}) => {
    console.log("Hello");
    return (
        <div 
        className="container modal fade new-ticket-container"
        id="newTicketModal"
        tabIndex="-1"
        aria-labelledby="newTicketModal" 
        aria-hidden="true" 
        >
            <button type="button" className="close modal-close-btn text-light" data-dismiss="modal" aria-label="Close">x</button>
            <div className="modal-dialog modal-dialog-centered">
                {children}
            </div>
        </div>
    )
}

export default Modal;