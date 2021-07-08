var playing = false;
var score;
var action;
var timeremaining;
var CorrectAnswer;
var lives;

//Name entry prompt.
var pt = prompt("Hello User. Please enter your name");
document.getElementById("prompt").innerHTML = pt;

//if we click on start/reset
document.getElementById("start_reset").onclick =
function(){
    //if we are playing
    if(playing == true){
        location.reload();//reload page
    }
    
    else{//if we are not playing
        //change mode to playing
        playing = true;
        
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //show lives left
        lives = 2;
        document.getElementById("lives_left").innerHTML = lives;
        
        //show count down box
        show("time_remaining");
        timeremaining = 60;
        document.getElementById("time_remaining_value").innerHTML = timeremaining;
        
        //hide game over box
        hide("gameover");
        
        //change button to reset
        document.getElementById("start_reset").innerHTML = "Reset Game";

        
        //start countdown
        startcountdown();
        
        //new question and multiple answers
        generateQA();
    }
    
}



//click on answer box

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check IF playing
    if(playing == true){
        if(this.innerHTML == CorrectAnswer){//looks like problem is here......
            //correct answer
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong and show correct box.
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);
            
            //generate new 
            generateQA();
           }
        else{
            //wrong answer.
            lives--;
            document.getElementById("lives_left").innerHTML = lives;
            if(lives == 0){
                stopCountDown();
                show("gameover");
            document.getElementById("gameOverScore").innerHTML = score;
            hide("time_remaining");
            hide("correct");
            hide("wrong")
            playing = false;
            document.getElementById("start_reset").innerHTML = "Start Game";
            }
            else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);}
            
        }
           
    }  
    
}
    
    
}





//functions

//start counter

function startcountdown(){
    action = setInterval(function(){
       timeremaining -=1;
       
document.getElementById("time_remaining_value").innerHTML = timeremaining;
        if(timeremaining == 0){//Game Over
            stopCountDown(); 
            show("gameover");
            document.getElementById("gameOverScore").innerHTML = score;
            hide("time_remaining");
            hide("correct");
            hide("wrong")
            playing = false;
            document.getElementById("start_reset").innerHTML = "Start Game";
        }
    }, 1000)
}
//stops counter

function stopCountDown(){
    clearInterval(action);
}

//hide function
function hide(id){
    document.getElementById(id).style.display = "none";
}

//show function

function show(id){
    document.getElementById(id).style.display = "block";
}

//generate question and multiple answers

function generateQA(){
    var x = 1 + Math.round(49*Math.random()); //random gemerates random number between 0 & 1.
    var y = 1 + Math.round(9*Math.random());
    CorrectAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" +y;
    var CorrectPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+CorrectPosition).innerHTML = CorrectAnswer;//fill 1 box with correct answer.
    
    //answers array consisting of all answers including correct and wrong answers.
    var answers = [CorrectAnswer];//first element is correctAnswer, wrong answers populate answers array from position 1 to 3.
    
    //fill other boxes with wrong answers.
    for(i=1;i<5;i++){
        if(i != CorrectPosition){ //(!== Not equal type)(==equal value)(=== equal value and equal type)(!=not equal value).
            var WrongAnswer;
            do{
                WrongAnswer =(1+Math.round(49*Math.random()))*(1 + Math.round(9*Math.random()));//a wrong number.
            }
            while(answers.indexOf(WrongAnswer)>-1) //if wrong answer has indes greater than -1 i.e. form 0 to 3, then it means it is present in the array. So, the created answer gets replaced with the already existing number in the array.

            document.getElementById("box"+i).innerHTML = WrongAnswer;
                answers.push(WrongAnswer); //adds the newly created wrong answer to the answers array. 
            
        }
    }
}



















