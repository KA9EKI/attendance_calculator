const buttons = document.querySelectorAll("button");
const reset = document.querySelector(".del");
reset.addEventListener("click",()=>{
  attendance = {
    Maths:{p:0,t:0,lec:0,tut:0,prac:0},
    Physics:{p:0,t:0,lec:0,tut:0,prac:0},
    EngDrawing:{p:0,t:0,lec:0,tut:0,prac:0},
    Manufacturing:{p:0,t:0,lec:0,tut:0,prac:0},
    ProfComm:{p:0,t:0,lec:0,tut:0,prac:0},
    Python:{p:0,t:0,lec:0,tut:0,prac:0}
  };
  localStorage.setItem("attendance",JSON.stringify(attendance));
  updateAllPage();
})

let attendance= JSON.parse(localStorage.getItem("attendance"))||{
  Maths:{p:0,t:0,lec:0,tut:0,prac:0},
  Physics:{p:0,t:0,lec:0,tut:0,prac:0},
  EngDrawing:{p:0,t:0,lec:0,tut:0,prac:0},
  Manufacturing:{p:0,t:0,lec:0,tut:0,prac:0},
  ProfComm:{p:0,t:0,lec:0,tut:0,prac:0},
  Python:{p:0,t:0,lec:0,tut:0,prac:0}
}
function updateAllPage(){
  for(let subject in attendance){
    updateUi(subject);
  }
}

function updatingData(subject,type,present){
  if(type=="lecture"){
    if(present){
      attendance[subject].p +=1;
      attendance[subject].t +=1;
    } else{
      attendance[subject].t +=1;
    }
    attendance[subject].lec +=1;
  }else if (type=="practical"){
    if(present){
      attendance[subject].p +=2;
      attendance[subject].t +=2;
    } else{
      attendance[subject].t +=2;
    }
    attendance[subject].prac +=1;
  }else if (type=="tutorial"){
    if(present){
      attendance[subject].p +=0.5;
      attendance[subject].t +=0.5;
    } else{
      attendance[subject].t +=0.5;
    }
    attendance[subject].tut +=1;
  }
  localStorage.setItem("attendance",JSON.stringify(attendance));
  updateUi(subject,type);
  updateAllPage();
}  

function updateUi(subject){
  let update =document.querySelector(`#${subject} .count`);
  if(attendance[subject].t != 0){
    let z = Math.round((attendance[subject].p/attendance[subject].t)*100)
    update.innerHTML = `
      <p>
        Attended: ${z} %
      </p>
      <p> L/T/P: ${attendance[subject].lec} / ${attendance[subject].tut} / ${attendance[subject].prac}`;
  } else{
    update.innerHTML = `
      <p>
        Attended: 0 %
      </p>
      <p> L / T / P: 0 / 0 / 0</p>`; 
  }
  
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const subject = event.target.getAttribute("data-subject");
    const type = event.target.getAttribute("data-type");
    const present = event.target.classList.contains("p");
    updatingData(subject, type, present);
  });
  
  
});

updateAllPage();
