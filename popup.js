// Pull current queue from DB
window.onload = () => {
  getData(); 
}

//Post request to DB and reload
document.getElementById('myForm').addEventListener('submit', addPerson); 

////////////////////
////Helper Funcs////
////////////////////

function getData(){
  //clear text input box
  document.getElementById('fNameInput').value = ''; 
  fetch('http://localhost:3001/person')
    .then(function(res) {
      return res.json();
    })
    .then(myJson => {
      //empty the queueContainer
      document.getElementById('queueContainer').innerHTML = ''; 

      //Create li and button for each person in DB
      myJson.forEach((obj,i) => {
        if(i === 0){
          //add 1st person to #player1 span
          document.getElementById('player1').innerHTML = obj.name;
        }else if(i === 1){
          //add 2nd person to #player2 span
          document.getElementById('player2').innerHTML = obj.name;
        }else{
          //create <li>
          let child = document.createElement('li');
          child.innerHTML = obj.name;
          //create <button>
          let deleteButton = document.createElement('button');
          //DELETE Event
          deleteButton.addEventListener('click', deletePerson);
          deleteButton.setAttribute('class', 'deleteButton');
          deleteButton.setAttribute('id', obj._id);
          deleteButton.innerHTML='Delete'; 
          child.appendChild(deleteButton);
          //append to the DOM 
          document.getElementById('queueContainer').appendChild(child); 
        }
      });
    })
    .catch(err => console.error(`error from fetch call:  ${err}`)); 
}

function addPerson(e) {
  e.preventDefault(); 
  let newPerson = document.getElementById('fNameInput').value;
  fetch('http://localhost:3001/person', {
    method:"POST", 
    body: JSON.stringify({"name": newPerson}),
    headers: {
      'Content-Type': 'application/json'
      },
  })
  .then(res => {
    console.log(`response from server to popupJs about addPerson is: ${res}!!!!!`);
    newPerson.value = ""; 
    getData();
  })
  .catch((err) => console.error(`There was an err witht POST: ${err}..`));
}

function deletePerson(e){
  let deleteURL = `http://localhost:3001/person/${this.id}`;
  fetch(deleteURL, {
    method: 'DELETE'
  })
    .then(res =>{
      console.log(`Response fom popup from server to popupJS: ${res}`); 
      getData(); 
    })
    .catch(e => console.warn(e));
}