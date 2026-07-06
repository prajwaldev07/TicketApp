import {useState} from "react";
import axios from 'axios';
import './TicketForm.css';

function TicketForm(){

    const[form,setForm]=useState({
        title:'',
        description:'',
        Priority:'',
        CreatedBy:'',
        CreatedAt:''

    })

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/tickets',form);
            alert("Ticket Craeted");
            setForm({title:'',description:'',Priority:'',CreatedBy:'',CreatedAt:''});

        }catch(error){
            alert("Error fetching Ticket");
        }
    }

    return(
        <>
        <h1 style={{ textAlign: "center" }}>Ticket Form</h1>
        <div className="container">
        <form onSubmit={handleSubmit} className="ticket-form">
            Title:<input type="text" name="title" value ={form.title} onChange={handleChange}/><br/>
            Description:<input type="text" name="description" value={form.description} onChange={handleChange}/><br/>
             Priority:<select name="Priority" value ={form.Priority} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value ="Medium">Medium</option>
                <option value="High">High</option>
             </select><br/>
              CreatedBy:<input type="text" name="CreatedBy" value ={form.CreatedBy} onChange={handleChange}/><br/>
              CreatedAt:<input type="date" name="CreatedAt" value={form.CreatedAt} onChange={handleChange}/><br/>
            <button type="submit"> Create Ticket</button><br/>
        </form>
        </div>
        </>
    );
}

export default TicketForm;
