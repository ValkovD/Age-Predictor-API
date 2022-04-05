
const inputField = document.querySelector('input');
const ul = document.querySelector('ul');
document.querySelector('button').addEventListener('click', predictAge);
const errorImg = document.getElementById('error-img');
const spinImg = document.getElementById('spinner');

function predictAge(e) {
  errorImg.style.display = 'none';
  ul.innerHTML = '';
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.agify.io?name=${inputField.value}`, true);

  xhr.onprogress = function () {

  };

  xhr.onload = function () {
    if (this.status != 200) {
      errorImg.style.display = 'block';
      ul.innerHTML = `<li style = "color: red">ststus: ${this.status}, ${this.statusText} </li>
      <li>Please enter name</li>`
      console.log(xhr);
    }
    else {
      spinImg.style.display = 'block';
      const resParsed = JSON.parse(this.responseText);

      function hideSpinner() {
        spinImg.style.display = 'none'
      };
      function showResult() {
        ul.innerHTML = `
        <li>name: ${resParsed.name}</li>
        <li>Predicted age: ${resParsed.age}</li> 
        <li>count number: ${resParsed.count}</li>`
      };

      setTimeout(hideSpinner, 2000);
      setTimeout(showResult, 2000);

      // console.log(this)
    }
  };

  xhr.onerror = function () {
    ul.innerHTML = `<li style = "color: red">Error Error Error</li>`
  }

  xhr.send();
};