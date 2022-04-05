//first section done with java script modules
import { input, ul, predict1Btn, errorImg, spinImg, reset1 } from './section1.js';
// JS MODULES
//second section multiple names
const input2 = document.getElementById('input2');
const btnAdd = document.getElementById('btn-add');
const errorImg2 = document.getElementById('error-img2');
const spinImg2 = document.getElementById('spinner2');
document.getElementById('predict2').addEventListener('click', predictAgeMulti);
const ul2 = document.getElementById('ul2');
btnAdd.addEventListener('click', addNameInTxtField);
let namesGrouped = `https://api.agify.io?`;
document.getElementById('reset-section2').addEventListener('click', resetSection2);
// third section name and country
const input3 = document.getElementById('input3');
const inputC = document.getElementById('country');
const errorImg3 = document.getElementById('error-img3');
const ul3 = document.getElementById('ul3');
const spinImg3 = document.getElementById('spinner3');
document.getElementById('predict3').addEventListener('click', predictAgeByCountry);
document.getElementById('reset-section3').addEventListener('click', resetSection3);
console.log(window.innerWidth)
// `https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane`

//Reset buttons 1 and 2




function resetSection2(e) {
  input2.value = '';
  ul2.innerHTML = '';
  errorImg2.style.display = 'none';
  let namesGrouped = `https://api.agify.io?`;
  e.preventDefault()
};


function resetSection3(e) {
  input3.value = '';
  ul3.innerHTML = '';
  errorImg3.style.display = 'none';
  inputC.value = '';
  e.preventDefault()
};


//support function adding names in the list of the UI
function addNameInTxtField(e) {
  if (!input2.value) {

  } else {
    namesGrouped += `name[]=${input2.value}&`;

  }
  ul2.innerHTML += `
  <li><h2>${input2.value}</h2></li>`;
  input2.value = '';
  input2.focus();
  console.log(namesGrouped)
  e.preventDefault();
};

// fetch functions


//PREDICT AGES ON MULTIPLE NAMES and display them in the ul
function predictAgeMulti(e) {
  ul2.innerHTML = '';
  errorImg2.style.display = 'none';

  fetch(namesGrouped)
    .then(function (res) {
      if (!res.ok && !input2.value) {
        throw new Error(error);
      }
      return res
    })
    .then(function (res) { return res.json() })
    .then(function (data) {
      spinImg2.style.display = 'block';

      function hideSpinnerF() {
        spinImg2.style.display = 'none';
      };
      function showResultsF() {
        let output = '';
        console.log(data)
        data.forEach(function (person) {
          output += `
        <li><h3>name: ${person.name}, age: ${person.age}, count: ${person.count}</h3></li>`
        })
        ul2.innerHTML = output;
      };


      setTimeout(hideSpinnerF, 2000);
      setTimeout(showResultsF, 2000);


    })
    .catch(function (error) {
      errorImg2.style.display = 'block';
      ul2.innerHTML = `<h3 style = "color:red">ERROR please add name</h3>`
    })

  e.preventDefault();
};

//Predict Age By Country input

function predictAgeByCountry(e) {
  fetch(`https://api.agify.io?name=${input3.value}&country_id=${inputC.value}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(error);
      }
      return res
    })
    .then(res => res.json())
    .then(data => {

      ul3.innerHTML = '';
      errorImg3.style.display = 'none';
      //show spinner
      spinImg3.style.display = 'block';
      //function hide spinner
      function hideSpinnerF() {
        spinImg3.style.display = 'none';
      };
      //function display output
      function showResultsF() {
        ul3.innerHTML = `
        <li><h2>name: ${data.name}</h2></li>
        <li><h2>age: ${data.age}</h2></li>
        <li><h2>country: ${data.country_id}</h2></li>
        <li><h2>count: ${data.count}</h2></li>`;
      };
      setTimeout(hideSpinnerF, 2000)
      setTimeout(showResultsF, 2000)

    })
    .catch(error => {
      errorImg3.style.display = 'block';
      ul3.innerHTML = `<h3 style = "color:red">ERROR please add name</h3>`
    })
  e.preventDefault();
};