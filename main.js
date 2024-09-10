var controlInterface = document.querySelector(".Interface");
var controlButton = document.querySelector(".Interface>span");
var cards = document.querySelectorAll("div[class^='card']");
var Happy = ["h1.gif","h2.gif","h3.gif","h4.gif","h5.gif"];
var  Sad  = ["s1.gif","s2.gif","s3.gif","s4.gif","s5.gif"];

function Rotation(){
    setTimeout(()=>{
        cards.forEach((card) => {
            card.style.transform = "rotateY(180deg)";
        })
        setTimeout(()=>{
            cards.forEach((card) => {
                card.style.transform = "rotateY(0deg)";
            })
            document.getElementsByTagName("h1")[0].style.bottom = "50px";
        },1000);
    },500);
}

function handleClick(){
    let clicked = 0;
    let Done = 0;
    cards.forEach((card) => {
        card.addEventListener("click" , () => {
            
            if(!card.classList.contains("Done")){

                if(!card.classList.contains("clicked")){
                    clicked++;
                    card.classList.add("clicked");
                }
                if(clicked <= 2) card.style.transform = "rotateY(180deg)";
            }     

            if(clicked == 2){
                let clickedCard = Array.from(document.querySelectorAll(".clicked"));
                if(clickedCard[0].querySelector(".back img").src === clickedCard[1].querySelector(".back img").src){
                    Done++;
                    console.log(Done);
                    playCorrectSound();
                    clickedCard.forEach((c)=>{
                        c.classList.replace("clicked","Done");
                    })
                }
                else{
                    playWrongSound();
                    clickedCard.forEach((c)=>{
                        c.classList.add("diff");
                    })
                    setTimeout(() => {
                        clickedCard.forEach((c)=>{
                            c.style.transform = "rotateY(0deg)";
                            c.classList.remove("diff");
                        })
                    }, 1000);

                    clickedCard.forEach((c)=>{
                        c.classList.remove("clicked");
                    })
                }
                clicked = 0;
            }

            if(Done === 8){
                handleStatus("winner");
            }
        })
        
    })
}

function playCorrectSound(){
    let correct = document.getElementById("correct");
    correct.currentTime = 0;
    correct.play();
}

function playWrongSound(){
    let wrong = document.getElementById("wrong");
    wrong.currentTime = 0;
    wrong.play();
}

function Time() {
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    let msec = document.getElementById("m-sec");

    min.innerHTML = "00:";
    sec.innerHTML = "00:";
    msec.innerHTML = "00";

    let s = 60;
    let ms = 99;

    let interval = setInterval(() => {
        ms--;

        if(ms < 10){
            msec.innerHTML = `:0${ms}`;
        }
        else{
            msec.innerHTML = `:${ms}`;
        }

        if(ms === 0){
            ms = 99;
            s--;

            if (s < 10) {
                min.style.color = "#000";
                sec.style.color = "#000";
                msec.style.color = "#000";


                sec.innerHTML = `0${s}`;
            } else {
                sec.innerHTML = s;
            }
        }

        if(s === 0){
            clearInterval(interval);
            handleStatus("loser");
        } 


    }, 10); 
}

let flag = true;
function handleStatus(status){
    if(flag){
        document.body.append(controlInterface);
    
        const startButton = document.querySelector(".Interface .start");
        startButton.style.display = "none";


        const container = document.createElement("div");
        const img = document.createElement("img");
        const message = document.createElement("h2");
        const button = document.createElement("span");
    
        if(status === "winner"){
            container.classList.add("winner");
            img.src = `images/happy/${Happy[Math.floor(Math.random()*5)]}`;
            message.innerHTML = "Congratulations you won";
            button.innerHTML = "Play again";
            button.addEventListener("click" , ()=>{
                location.reload();
            })
            container.append(img);
            container.append(message);
            container.append(button);
            controlInterface.append(container);
        }
        else{
            container.classList.add("loser");
            img.src = `images/sad/${Sad[Math.floor(Math.random()*5)]}`;
            message.innerHTML = "Time is up, you lost";
            button.innerHTML = "Play again";
            button.addEventListener("click" , ()=>{
                location.reload();
            })
            container.append(img);
            container.append(message);
            container.append(button);
            controlInterface.append(container);
        }
    }
    flag = false;
}


function shuffle() {
    const cardsImg = Array.from(document.querySelectorAll("div[class^='card'] .back img"));
    const arr = [];
    
    for (let i = 0; i < cardsImg.length; i++) {
        arr.push(cardsImg[i].src);
    }

    for (let i = 0; i < cardsImg.length; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        cardsImg[i].src = arr[randomIndex];
        arr.splice(randomIndex, 1);
    }
}

//-----------------------
controlButton.addEventListener("click" , ()=>{
    controlInterface.remove();
    Rotation();
    handleClick();
    Time();
    shuffle();
})
