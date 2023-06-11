const express = require('express');

const app = express();

app.use(express.json());

const students = [
    {id : 1, name: 'Nelson',edad: 20, enroll: true },
    { id : 2, name: 'Israel',edad: 21, enroll: false},
    {id : 3, name: 'Christopher',edad: 23, enroll: false},
    {id : 1, name: 'Jose',edad: 20, enroll: true },
   
];

app.get('/', ( req, res)=>{
    res.send('Estamos activos En este puerto');
});

app.get('/api/students',(req,res)=>{
    res.send(students);
});

app.get('/api/students/:id',(req,res)=>{
    const students = students.find(c=>c.id === parseInt(req.params.id));
    if(!students) return res.status(404).send('Estudiante no encontrado');
    else res.send(students);
})

app.post('/api/students',(req,res)=>{
    const students={
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
    students.push(students);
    res.send(students);
});

app.delete('/api/students/:id', (req,res) =>{
    const students = students.find(c=>c.id === parseInt(req.params.id));
    if(!students) return res.status(404).send('Estudiante no encontrado');

    const index = students.indexOf(students);
    students.splice(index,1);
    res.send(students);
    
});

const port = process.env.port || 80;
app.listen(port, () => console.log( `Escuando en el puerto ${port} `));