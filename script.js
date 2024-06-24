let num = document.querySelector(".number");
let score = 0;
let combo = 0;
let hits = 0;
let fullHits = 0;
let hundredHits = 0;
let fiftyHits = 0;
let misses = 0;
let multiplier = 1.00;
let performancePoint = 0.00;
let gameArea = document.querySelector(".game");
let comboTracker = document.querySelector(".combo-tracker")
let scoreMulti = document.querySelector(".score-multiplier");
let percentageTracker = document.querySelector(".percentage-tracker");
let hr = document.querySelector("#hardrock");
let hd = document.querySelector("#hidden");
let dt = document.querySelector("#doubletime");
let fl = document.querySelector("#flashlight");

//all the event listener
document.addEventListener("keydown", keyBind);
hd.addEventListener("change", modHD);
hr.addEventListener("change", modHR);
dt.addEventListener("change", modDT);
fl.addEventListener("change", modFL);

//keybind system
function keyBind(event){
    if (event.keyCode == 83 || event.keyCode == 88) {
        gainFull();
        ppSystem();
    }
    else if (event.keyCode == 68){
        gain100();
        ppSystem();
    }
    else if (event.keyCode == 67){
        gain50();
        ppSystem();
    }
    else if (event.keyCode == 82){
        resetAll();
    }
    else if (event.keyCode == 69){
        resetCombo();
    }
};

//formula for points
function scoringSystem(){
    scoreFormula = 1 + ((combo-1)*multiplier/25);
    // console.log(scoreFormula);
}

//formula for accuracy

function accSystem(){
    accFormula = ((fullHits*300) + (hundredHits*100) + (fiftyHits*50))/(300*(hits))*100;
    // console.log(accFormula.toFixed(2));
    // console.log(scoreFormula);
    accDisplay();
}

//formula for performance point
function ppSystem(){
    scoreDisplay();
    comboDisplay();
    accSystem();
    accuracyWeight = accFormula/100;
    netPP = Math.round((((fullHits*0.1*accuracyWeight)/(((0.2*hundredHits)+(0.3*fiftyHits)+(0.4*misses)+1))-1)) * 100) / 100;
    console.log("netPP: " + netPP);
    if (netPP < 0 && performancePoint <= 0) {
    performancePoint = 0;
    console.log("PP: " + performancePoint.toFixed(2));
    } else if (netPP > 0 && performancePoint <= 0 ){
      performancePoint = (performancePoint*0.1) + (netPP*1/hits) * multiplier * (combo/1000)*(score/(300*hits));
    console.log("PP: " + performancePoint.toFixed(2));
    } else {
      performancePoint = (performancePoint*0.1) + (netPP*100/hits) * multiplier * (combo/1000)*(score/(300*hits));
      console.log("PP: " + performancePoint.toFixed(2));
      }
}


//gain 300 pointsx
function gainFull(event){
    comboTrack();
    scoringSystem();
    score = score + 300 * scoreFormula;
    hits = hits + 1;
    fullHits = fullHits + 1;
    accSystem()
    scoreDisplay();
};

//gain 100 points
function gain100(event){
    comboTrack();
    scoringSystem();
    score = score + 100 * scoreFormula;
    hits = hits + 1;
    hundredHits =hundredHits + 1;
    accSystem()
    scoreDisplay();
};

//gain 50 points
function gain50(event){
    comboTrack();
    scoringSystem();
    score = score + 50 * scoreFormula;
    hits = hits + 1;
    fiftyHits = fiftyHits + 1;
    accSystem()
    scoreDisplay();
};

//combo counter and tracker
function comboTrack(event){
    combo = combo + 1;
    comboDisplay();
}

//---------------------------------RESET---------------------------------//

//reset all feature
function resetAll(){
    score = 0;
    combo = 0;
    performancePoint = 0;
    hits = 0;
    fullHits = 0;
    hundredHits = 0;
    fiftyHits = 0;
    misses = 0;
    scoreDisplay();
    comboDisplay();
}

//reset combo feature (miss)
function resetCombo(){
    combo = 0;
    hits = hits + 1
    misses = misses + 1;
    accSystem()
    comboDisplay();
    ppSystem();
}

//---------------------------------Displayers---------------------------------//

//score displayer
function scoreDisplay(){
    num.removeChild(num.firstElementChild);
    let displayScore = document.createElement("p");
    displayScore.innerHTML = Math.round(score);
    num.append(displayScore);
}

//combo displayer
function comboDisplay() {
    comboTracker.removeChild(comboTracker.firstElementChild);
    let displayCombo = document.createElement("p");
    displayCombo.innerHTML = combo;
    comboTracker.append(displayCombo);
}

function accDisplay() {
  percentageTracker.removeChild(percentageTracker.firstElementChild);
  let displayAcc = document.createElement("p");
  displayAcc.innerHTML = accFormula.toFixed(2);
  percentageTracker.append(displayAcc);
}

//---------------------------------MODS---------------------------------//

//hidden mod
function modHD() {
  if (hd.checked == true){
    scoreMulti.removeChild(scoreMulti.firstElementChild);
    let displayScoreMulti = document.createElement("p");
    multiplier = ((multiplier*100/100*1.06));
    displayScoreMulti.innerHTML = multiplier.toFixed(2);
    scoreMulti.append(displayScoreMulti);
  } else if (hd.checked == false){
    scoreMulti.removeChild(scoreMulti.firstElementChild);
    let displayScoreMulti = document.createElement("p");
    multiplier = ((multiplier*100/100/1.06));
    displayScoreMulti.innerHTML = multiplier.toFixed(2);
    scoreMulti.append(displayScoreMulti);
  }
}

//hardrock mod
function modHR() {
  if (hr.checked == true){
    scoreMulti.removeChild(scoreMulti.firstElementChild);
    let displayScoreMulti = document.createElement("p");
    multiplier = ((multiplier*100/100)*1.06);
    displayScoreMulti.innerHTML = multiplier.toFixed(2);
    scoreMulti.append(displayScoreMulti);
  } else if (hr.checked == false){
    scoreMulti.removeChild(scoreMulti.firstElementChild);
    let displayScoreMulti = document.createElement("p");
    multiplier = ((multiplier*100/100)/1.06);
    displayScoreMulti.innerHTML = multiplier.toFixed(2);
    scoreMulti.append(displayScoreMulti);
  }
}

//doubletime mod
function modDT() {
    if (dt.checked == true){
      scoreMulti.removeChild(scoreMulti.firstElementChild);
      let displayScoreMulti = document.createElement("p");
      multiplier = ((multiplier*100/100)*1.12);
      displayScoreMulti.innerHTML = multiplier.toFixed(2);
      scoreMulti.append(displayScoreMulti);
    } else if (dt.checked == false){
      scoreMulti.removeChild(scoreMulti.firstElementChild);
      let displayScoreMulti = document.createElement("p");
      multiplier = ((multiplier*100/100)/1.12);
      displayScoreMulti.innerHTML = multiplier.toFixed(2);
      scoreMulti.append(displayScoreMulti);
    }
  }

//flashlight mod
function modFL() {
    if (fl.checked == true){
      scoreMulti.removeChild(scoreMulti.firstElementChild);
      let displayScoreMulti = document.createElement("p");
      multiplier = ((multiplier*100/100)*1.12);
      displayScoreMulti.innerHTML = multiplier.toFixed(2);
      scoreMulti.append(displayScoreMulti);
    } else if (fl.checked == false){
      scoreMulti.removeChild(scoreMulti.firstElementChild);
      let displayScoreMulti = document.createElement("p");
      multiplier = ((multiplier*100/100)/1.12);
      displayScoreMulti.innerHTML = multiplier.toFixed(2);
      scoreMulti.append(displayScoreMulti);
    }
  }
