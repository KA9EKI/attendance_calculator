const buttons = document.querySelectorAll("button");
const reset = document.querySelector(".del");
reset.addEventListener("click",()=>{
  attendance = {
    Maths:{p:0,t:0},
    Physics:{p:0,t:0},
    EngDrawing:{p:0,t:0},
    Manufacturing:{p:0,t:0},
    ProfComm:{p:0,t:0},
    Python:{p:0,t:0}
  }
  updateAllPage()
})

let attendance= JSON.parse(localStorage.getItem("attendance"))||{
  Maths:{p:0,t:0},
  Physics:{p:0,t:0},
  EngDrawing:{p:0,t:0},
  Manufacturing:{p:0,t:0},
  ProfComm:{p:0,t:0},
  Python:{p:0,t:0}
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
  }else if (type=="practical"){
    if(present){
      attendance[subject].p +=2;
      attendance[subject].t +=2;
    } else{
      attendance[subject].t +=2;
    }
  }else if (type=="tutorial"){
    if(present){
      attendance[subject].p +=0.5;
      attendance[subject].t +=0.5;
    } else{
      attendance[subject].t +=0.5;
    }
  }
  localStorage.setItem("attendance",JSON.stringify(attendance));
  updateUi(subject,type);
  updateAllPage();
}  

function updateUi(subject){
  let update =document.querySelector(`#${subject} .count`);
  update.innerHTML = `Attended: ${attendance[subject].p} / ${attendance[subject].t}`;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const subject = event.target.getAttribute("data-subject");
    const type = event.target.getAttribute("data-type");
    const present = event.target.classList.contains("p");
    updatingData(subject, type, present);
    updateUi(subject);
  });
  
  
});
