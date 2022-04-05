// The complete operation for the first section written and exported  file with extension .js for clear view that thiss is module for the main .js file
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const predict1Btn = document.querySelector('button'); predict1Btn.addEventListener('click', predictAge);
const errorImg = document.getElementById('error-img');
const spinImg = document.getElementById('spinner');
const reset1 = document.getElementById('reset-section1'); reset1.addEventListener('click', resetSection1);

function predictAge(e) {
  ul.innerHTML = '';
  errorImg.style.display = 'none';
  fetch(`https://api.agify.io?name=${input.value}`)
    .then(function (res) {
      if (!res.ok) {
        throw new Error(res.error)
      }
      return res
    })
    .then(function (res) { return res.json() })
    .then(function (data) {
      //spinner starts
      spinImg.style.display = 'block';
      //-----------------------------------
      //func to kill the spinner
      function hideSpinnerF() {
        spinImg.style.display = 'none';
      };
      //--------------------------------
      setTimeout(hideSpinnerF, 2000);
      setTimeout(showResultsF, 2000);
      //func display results
      function showResultsF() {
        ul.innerHTML = `
      <li><h2>name: ${data.name}</h2></li>
      <li><h2>age: ${data.age}</h2></li>
      <li><h2>count: ${data.count}</h2></li>`;
      }

      //-----------------------------------

    })
    .catch(function (error) {
      errorImg.style.display = 'block';
      ul.innerHTML = `<h3 style = "color:red">ERROR please add name</h3>`
    });

  // setTimeout(showResultF(), 2000);

  e.preventDefault();
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function resetSection1(e) {
  input.value = '';
  ul.innerHTML = '';
  errorImg.style.display = 'none';
  e.preventDefault()
};

export { input, ul, predict1Btn, errorImg, spinImg, reset1 }