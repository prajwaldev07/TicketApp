const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors'); 


const ticketRoutes=require('./Routes/ticketRoutes');

const app=express();
app.use(cors());
app.use(express.json());
//mongodb connection
mongoose.connect('mongodb://localhost:27017/ticketDB123')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));
    
app.use('/api/tickets',ticketRoutes);

const PORT=5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));



