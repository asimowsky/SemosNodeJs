const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
// !!! instalirano e cors za da ima komunikacija pomegju client i server side
// kreiranje students.json file
//treba da kreiram funkcija za da se cita student fajlot
// treba da kreiram funkcija za pisuvanje vo student fajlot
// ni treba get metoda za postavanje na ruta /students
// ni treba post metoda za ako e povikano post preku frontend da gi zacuva novite studenti preku forma
//app.listen za kreiranje na porta za da raboti serverot

const studentFile = path.join(__dirname, 'students.json');

const readStudentFile = () => {
  //definiranje na try catch block za po cista funkcija vo slucaj na error!
  try {
    //povikuvanje na readfile
    const data = fs.readFileSync(studentFile);
    //parsirame za da se convertira vo object
    return JSON.parse(data);
  } catch (err) {
    //log error i vrati prazen array vo slucaj ako ima error
    console.log(err);
    return [];
  }
};

const writeStudentFile = data => {
  try {
    //pisuvanje vo fajlot (so stringify za da objektot se convertira vo json string)
    fs.writeFileSync(studentFile, JSON.stringify(data));
  } catch (err) {
    //err
    console.log(err);
  }
};
//get metoda
app.get('/students', (req, res) => {
  //data = povikuvanje na fajlot za da se procita
  const data = readStudentFile();
  //vrakjame response data
  res.json(data);
});

//post metoda

app.post('/students', (req, res) => {
  //requestot od body odnosno frontot go definirame kako newstudent
  const newstudent = req.body;
  //povikuvame readstudents za de se procita fajlot i definirame kako data
  const data = readStudentFile();
  //kreirame ID za site objekti da bidat razlicni
  const id = Math.floor(Math.random() * 1000) + 1;
  //kreirame object student, i dodavame novo property ID
  const student = { ...newstudent, id };
  //na fajlot sto go povikavme za citanje gi pushnuvame novite podatoci
  data.push(student);
  //gi pisuvame preku funkcijata write
  writeStudentFile(data);
  res.json(student);
});

//listen povikuvanje 8080
app.listen(8080, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Server successfully started...');
});
