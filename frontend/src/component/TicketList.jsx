import React,{useState,useEffect} from "react";
import axios from "axios";
import "./TicketList.css";


function TicketList(){
    const[tickets,setTickets]=useState([])

    const fetchTickets=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/tickets");
            setTickets(res.data);
        }catch(error){
            alert("Error fetching Data")
        }
    }

     const deleteTicket = async(id)=>{
    try{
      await axios.delete(`http://localhost:5000/api/tickets/${id}`);
      setTickets(prevTickets=>prevTickets.filter(ticket=>ticket._id!==id));
    }catch(error){
      alert("Error deleting tickets.");
      console.log(error);
    }
  };

     const updateStatus = async(id,newStatus)=>{
    try{
      await axios.put(`http://localhost:5000/api/tickets/${id}`,{status:newStatus});
      setTickets(prevTickets=>prevTickets.map(ticket=>ticket._id===id?{...ticket,status:newStatus}:ticket))
    }catch(error){
      alert("Error updating status.");
      console.log(error);
  }
};

    useEffect(()=>{
    fetchTickets();
},[])
    return (
  <div className="ticket-list-container">
    <h2 className="ticket-list-title">Tickets</h2>

    {tickets.length === 0 && (
      <p className="no-ticket">No Ticket Found</p>
    )}

    {tickets.map((ticket) => (
      <div key={ticket._id} className="ticket-card">

        <h3>{ticket.title}</h3>

        <p><b>Description:</b> {ticket.description}</p>

        <p><b>Priority:</b> {ticket.Priority}</p>

        <p>
          <b>Status:</b>{" "}
          <span
            className={`status-badge ${
              ticket.status === "Open"
                ? "status-open"
                : ticket.status === "In progress"
                ? "status-in-progress"
                : "status-resolved"
            }`}
          >
            {ticket.status}
          </span>
        </p>

        <p><b>Created By:</b> {ticket.CreatedBy}</p>

        <p>
          <b>Created At:</b>{" "}
          {new Date(ticket.CreatedAt).toLocaleString()}
        </p>

        <div className="ticket-actions">
          <button
            onClick={() =>
              updateStatus(ticket._id, "In progress")
            }
          >
            In Progress
          </button>

          <button
            onClick={() =>
              updateStatus(ticket._id, "Resolved")
            }
          >
            Resolved
          </button>

          <button
            onClick={() => deleteTicket(ticket._id)}
          >
            Delete
          </button>
        </div>

      </div>
    ))}
  </div>
);
}

export default TicketList;