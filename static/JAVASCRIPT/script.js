// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
var port;
var player;
var game;
var multi;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
  
        icon.onclick = ()=>{
            // webLink = `http://localhost:${port}/`;
            webLink = `/${multi}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    if (selectData == "Mortal Kombat") {
        multi = 'mortal-kombat';
        player = 1;
    }
    else if (selectData == "Battleships") {
        multi = 'battleship';
        
        player = 1;
    }
   
    else if (selectData == "Hexgl") {
        player = 0;
        game = "HEXGL";
    }
    else if (selectData == "Piano") {
        player = 0;
        game = "PIANO";
    }
    else if (selectData == "Tic Tac Toe") {
        multi = 'tic-tac-toe';
        player = 1;
    }
    else if (selectData == "Snake Game") {
        multi = 'snake-game';
        player = 1;
    }
    else if (selectData == "Car Race") {
        player = 0;
        game = "CAR-RACE";
    }
    else if (selectData == "2048") {
        player = 0;
        game = "2048";
    }
    else if (selectData == "Ludo") {
        player = 0;
        game = "LUDO";
    }
    else if (selectData == "Squid Game") {
        game = "SQUID-GAME";
        player = 0;
    }
    else if (selectData == "Shadow Fight") {
        player = 1;
    }
    else if (selectData == "Mini Militia") {
        player = 0;
        game = "MINI-MILITIA";
    }
    
    icon.onclick = ()=>{
        if (player == 1) {
            
            webLink = `/${multi}`;
        }
        else if (player == 0) {
            webLink = `/static/WEB-GAMES/${game}/index.html`;

        }
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

