import sendRequest from './api.js';


var fR = new FileReader();
const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");
const deleteButton = document.getElementById("button-delete");

// Use the APIURL variable for fetch requests
const PLAYERURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/players`;
const TEAMURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/teams`;
const TEAM_ID = 420;
const COHORT_ID = 221;
var playerRoster;

const KEY_ENUM = Object.freeze({
  ID: 0,
  NAME: 1,
  BREED: 2,
  STATUS: 3,
  IMAGE: 4,
  CREATE: 5,
  UPDATE: 6,
  TEAM: 7,
  COHORT: 8,
  NONE: 9,
});
const REVERSE_ENUM = Object.freeze({
  TRUE: true,
  FALSE: false,
});

const updateRoster = async () => {
  const playersData = await sendRequest(PLAYERURL, "", { method: "GET" });
  playerRoster = playersData.data.players;
};
const getRoster = () => {
  return playerRoster;
};

const checkRoster = async (id) => {
  if (playerRoster.some((el) => el.id === id)) return true;
  const req = await sendRequest(PLAYERURL, id);
  console.log(req.success);
  return await req.success;
};
const getPlayer = async (id) => {
  if(await checkRoster()===true) return getRoster().filter((e)=> {return e.id === id}) ;
  const req = await sendRequest(PLAYERURL, id);
  return await req.data.player;
};

const addNewTeam = async(...data) => {
  console.log("Adding team")
  console.log(data);
  const team = generateTeam(420,"Jurrasic Bark",data);
  const req = await sendRequest(TEAMURL,'',{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify(team),
  })
  console.log(req);
};

const addNewPlayer = async (data) => {
  console.log("Adding player");
  data.updatedAt = new Date().toISOString();

    let option =  {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(option);
    const req = await sendRequest(PLAYERURL, "",option);
    console.log(req);
};
const update = (players) => {
  playerContainer.innerHTML = "";
  renderAllPlayers(players);
};
const updatePlayer = async (data) => {
  console.log(data);
  if (!(await checkRoster(data.id))) {
    data.updatedAt = new Date().toISOString();
    const req = await sendRequest(PLAYERURL, "", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return req;
  } else {
    console.log("Pupper with ID already in roster");
  }
};

const deletePlayer = async (id) => {
  
  try {
    await sendRequest(PLAYERURL, id, { method: "DELETE" });
    const updatedRoster = [...getRoster()].filter((e)=> {return e.id !== id});
    update(updatedRoster);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};
/*                                             >-------------------------V  ^~~~~~~~~~~~~~~~
                                              |...                       [@]                V
                                                           <..<<.       \    /              |
                                                                    ` .  \ / ~ ~````   <~<<~
                                                                      \. | ~/ 
                                                                      |. A~|    
   ____________                                       o   ____        |.P~|                                          
  X  [{},{},{ }                                    ||O\ /.js /|...>...^ I~|                                                             <nth Ch>     .                 
  X  o=======@,{},{},{} ]                         ##|| =====|#<~~~<~~~<~~                                                                  .       .               
  X  LOOP|     @==========O-<[{ parse }]<~1-1-0-0-1-0...1~~~<                                                                              .     .       ...                  
  X       _<{}>,                  |s+|</>  ,   ,   ,   ,` <>|s+|                                                                       <btn>   <li> <li> <li>   
 X < < <|  |)< {}>,<{}>,<{}>,<{}> | |<{}><{s}><{}><{s}><{}> | | </><{s}><{s}><{s}><{s}><{s}>                         <nth Sib>.           \     \  |  /
XX v(o)^ ========o======>=======o=======>==========o======>=========o========>=========o                                        .    <P>   \    <UL>                                                                                        
*>< > > >>> ][ ][ ] [ ] [  ] [  ]['`/                                                  <{s}>             (!)=>Detail ===  <btn>    .    \  |   /   . .      
      ___________________<_______________________________<___________________<>_<{s}>________@                               \       . <{{s!}>    .                                                         
L__ (O___O___O___O_____O___O___O___O____O___O___O___O___O___O___O___O___O___O___O___O__O)                                     <{s?}> .   =    <{s!}>  .<{s!}>...                                                                                                      
V   /   |   |    |     |   |   |   |    |   |   |   |   |   |   |   |    |   |   |   |                                           =   .   =       =   /                                                        
 V     </><{s}><{s}><{s}><{s}><{s}><{s}><{s}><{s}><{s}><{s!}>  |   |    |   |   |   |                                   ...<{s!}>=======<DIV.C>======<{s!}>...                                                      
  L__    ^      ^   ^   ^   ^   ^   ^   ^   ^   !   !     <{s!}>                                                            .       /  <BODY>   _\_   .                                                     
  V    /    S&R-!---!---!---!---!---!---!---!---^---^--^---S&R @_                                                        ..`   <{s!}>  <HEAD>   <  !   ..<bt> === Remove <=(!)                                                        
  V    |                  Loop   !=e                            `\                                                                     <HTML>  .  {  }   
  L__> ^__>_</>_<{s}>_<{s>_<{s}>_<{s}>_<{s}>_<{s}>_<{s}>__<{s}> (X!)=>__<{s!}><{s!}>_<{s!}>_<{s!}>__<{s!}>___<{s!}>____<{s!}>__===>++(DOM Tree)  p  ~.s li >
  V   <{s}>                                              / ` V ` \=                                                                    (Root)  u.l.,`,li  p  ,
 V     \                                                   <{s}>  =
L__   <{s}>_____________<_______<{s}>____<{s}>__<{s}>__<{s}>_______= 
     
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * [{},{},{}] => <>{} <>{} <{>} <{}> <{}>  => + <>{}{}{}{}{}{}{}{}{}{}{}{}<>
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * <>{}{}{}{}{}{}{}{}{}{}{}{}<> =>+ DOM
 *   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
 *   !-!-!-!-!-!-!-!-!-!-!-!--S&R
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from r*oster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const renderCard = (player) => {
  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card");
  playerCard.innerHTML = `<div class="content">
                            <p class="player-name">${player.name}</p>
                            <p class="player-breed">${player.breed}</p>
                            </div>
                            <img src='${player.imageUrl}'/>
                          `;
  /*                            <p>${player.status}</p>
                            <footer>
                              ${player.id}
                              ${player.teamId}
                              ${player.cohortId}
                            </footer>
 */

  return playerCard;
};

const renderAllPlayers = (playerList) => {
  try {
    playerList.forEach((player) => {
      const playerCard = renderCard(player)

      playerCard.addEventListener('click', (e)=>{
        updateDetailPane(player);
      });

      playerContainer.append(playerCard);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};


const renderNewPlayerForm = () => {
  try {
    newPlayerFormContainer.innerHTML = generatePlayerForm();
    const buttonSubmit = newPlayerFormContainer.querySelector(
      'input[type="submit"]'
    );
    const inputFile = document.querySelector("input[type=file]");
    const avatar = document.getElementById('preview-avatar');

    console.log("Submit");
    console.log(buttonSubmit);

    console.log("Imaged");
    console.log(inputFile);

    inputFile.addEventListener("change", (e) => {
      console.log("File uploaded");
      const image = e.target.files[0];

      fR.onload = (e) => {
        let src = e.target.result;
        avatar.src = src;
      };
      fR.readAsDataURL(image);
      console.log(avatar);
    });

    buttonSubmit.addEventListener("click", async function (e) {
      e.preventDefault();
      console.log("Submit clicked");
      console.log(e);
      const formEl = e.target.closest("form");
      const inputName = formEl[0].value;
      const inputBreed = formEl[1].value;
      const inputStatus = formEl[2].value;
      const inputTeam = formEl[3].value;
      const fileImg = avatar.src;
      const puppy = {
        name:inputName,
        breed:inputBreed,
        status:inputStatus,
        imageUrl:fileImg,
        teamId:inputTeam
      };
      addNewPlayer(puppy);
      await updateRoster();
      const updatedRoster = getRoster(); 
      update(updatedRoster);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};



const validateForm = () => {};

const sortBy = (
  players,
  sort_value = KEY_ENUM.NONE,
  reverse = REVERSE_ENUM.FALSE
) => {
  const option = sort_value;
  let sortedRoster = [...players];
  if (sort_value !== KEY_ENUM.NONE) {
    sortedRoster = players.sort((a, b) =>
      a[Object.keys(a)[option]] > b[Object.keys(b)[option]]
        ? 1
        : b[Object.keys(b)[option]] > a[Object.keys(a)[option]]
        ? -1
        : 0
    );
  }
  if (reverse) return sortedRoster.reverse();
  return sortedRoster;
};

const filterBy = (players, value, option = KEY_ENUM.NONE) => {
  let predicate = String(value).toLowerCase();
  let filteredRoster = [...players];
  if (option !== KEY_ENUM.NONE) {
    filteredRoster = players.filter((player) =>
      String(player[Object.keys(player)[option]])
        .toLowerCase()
        .includes(predicate)
    );
  }
  return filteredRoster;
};


const updateDetailPane = (player) => {
  console.log("Player clicked");
  console.log(player);
  const getDetails = () => {}
  const contentList = document.getElementById('player-detail-list').children;
  contentList[KEY_ENUM.ID].innerHTML="ID: "+player.id;
  contentList[KEY_ENUM.NAME].innerHTML="Name: "+player.name;
  contentList[KEY_ENUM.BREED].innerHTML="Breed: "+player.breed;
  contentList[KEY_ENUM.STATUS].innerHTML="Status: "+player.status;
  contentList[KEY_ENUM.CREATE-1].innerHTML="Created on: "+player.createdAt;
  contentList[KEY_ENUM.UPDATE-1].innerHTML="Last updated: "+player.updatedAt;
  contentList[KEY_ENUM.TEAM-1].innerHTML="Team #: "+player.teamId;
  contentList[KEY_ENUM.COHORT-1].innerHTML="Cohort #: "+player.cohortId;
  const avatar = document.getElementById('pane-avatar');
  const imgData = player.imageUrl;
  console.log(imgData);
  avatar.src = imgData;
}

//const ttp1 = {id:6811,name:"TestTubePoopies#1",breed:"Pomsky",status:"field",imageUrl:"https://i0.wp.com/petradioshow.com/wp-content/uploads/2020/02/mya2.jpg?resize=396%2C484&ssl=1",createdAt:"2023-06-03T04:17:02.720Z",updatedAt:"2023-06-03T04:17:02.720Z",teamId:420,cohortId:221};
//const ttp2 = {id:6811,name:"TestTubePoopies#2",breed:"Pomsky",status:"field",imageUrl:"https://metro.co.uk/wp-content/uploads/2016/06/pomsky-fox.jpg?quality=90&strip=all",createdAt:"2023-06-03T04:17:02.720Z",updatedAt:"2023-06-03T04:17:02.720Z",teamId:420,cohortId:221};
//const img1 = "https://i0.wp.com/petradioshow.com/wp-content/uploads/2020/02/mya2.jpg?resize=396%2C484&ssl=1";
await updateRoster();
const init = async () => {
  generateSelectSort();
  generateSelectFilter();
  const players = getRoster();
  //const ttpClones = (players.length +10);
  //for(let i=players.length; i<ttpClones; i++){
  // let poopy = generateCutePoopies(9000,`TestTubePoopies#${i+3}`,"pomsky","field",img1,new Date().toISOString(),'',TEAM_ID,COHORT_ID);
  // await addNewPlayer(poopy);
  //}

  renderAllPlayers(players);
  renderNewPlayerForm();
  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const playerID = e.target.previousSibling.previousSibling.value;
    deletePlayer(playerID);
  });

    
  const carouselButtonRt = document.getElementsByClassName('carousel-btn-rt')[0];
  const carouselButtonLt = document.getElementsByClassName('carousel-btn-lft')[0];
  const carouselContainer= document.getElementsByClassName('carousel-container')
  const styleCContainer = getComputedStyle(document.body);
  const eWContainer = parseFloat(styleCContainer.width);
                    +parseFloat(styleCContainer.marginLeft);
                    +parseFloat(styleCContainer.marginRight);
                    -parseFloat(styleCContainer.gap)
  const playerCards = playerContainer.children
  const cardStyle = getComputedStyle(playerCards[0])
  const eWCard = parseFloat(cardStyle.width)
                  +parseFloat(cardStyle.marginLeft)
                  +parseFloat(cardStyle.marginRight)
                  
  const numActiveCards = eWContainer/eWCard;
  const w1 = playerCards[0].offsetLeft+playerCards[0].offsetWidth;
  const w2 = playerCards[1].offsetLeft
  const gapWidth = w2-w1;    
  const cumulativeGapW = gapWidth*(numActiveCards-1);
  const postContainerWidth = eWContainer-cumulativeGapW-(carouselButtonLt.offsetWidth*2)
  const postActiveCards = Math.floor(postContainerWidth/eWCard);
  let x1 = 0;
  let x2 = postActiveCards;   
  console.log('Elements:');
  console.log(carouselButtonRt);
  console.log(carouselButtonLt);
  console.log(carouselContainer);
  console.log(styleCContainer);
  console.log(eWContainer);
  console.log(playerCards);
  console.log(cardStyle);
  console.log(eWCard);
  console.log('Calc:');
  console.log(gapWidth);
  console.log(cumulativeGapW);
  console.log("pre Number of displayable cards: " + numActiveCards);
  console.log(postActiveCards);

  const updateCarousel = (x1,x2) => {
    const activeCards = [...getRoster()].slice(x1,x2);
    update(activeCards);
  }

  carouselButtonLt.addEventListener('click', ()=>{
    if(x1>0){
    x1--;
    x2--;
    updateCarousel(x1,x2);
    }
  })
  carouselButtonRt.addEventListener('click', ()=>{
    if(x2<getRoster().length){
    x1++;
    x2++;
    updateCarousel(x1,x2);
    }
  })

};
const generateSelectSort = () => {
  const selectMenu = document.createElement("select");
  selectMenu.classList.add("select-sort,options-sort");
  selectMenu.setAttribute("name", "sorting");
  const options = `
  <option value="ID">ID</option>
  <option value="NAME">Name</option>
  <option value="BREED">Breed</option>
  <option value="STATUS">Status</option>
  <option value="CREATE">Created</option>
  <option value="UPDATE">Updated</option>
  <option value="TEAM">Team ID</option>
  <option value="COHORT">Cohort ID</option>
  `;
  selectMenu.innerHTML = options;
  selectMenu.addEventListener("change", (e) => {
    const selectElement = e.target;
    const sortOp = selectElement.value;
    const sortedplayers = sortBy(getRoster(), KEY_ENUM[sortOp]);
    update(sortedplayers);
  });
  const container = document.getElementsByClassName("select-sort");
  container[0].appendChild(selectMenu);
};

const generateSelectFilter = () => {
  const filterMenu = document.createElement("select");
  filterMenu.classList.add("select-filter", "options-filter");
  filterMenu.setAttribute("name", "filtering");
  const options = `
  <option value="ID">ID</option>
  <option value="NAME">Name</option>
  <option value="BREED">Breed</option>
  <option value="STATUS">Status</option>
  <option value="CREATE">Created</option>
  <option value="UPDATE">Updated</option>
  <option value="TEAM">Team ID</option>
  <option value="COHORT">Cohort ID</option>
  `;
  filterMenu.innerHTML = options;

  const filterInput = document.createElement("input");
  filterInput.classList.add("select-filter");
  filterInput.setAttribute("id", "input-filter");

  const filterButton = document.createElement("button");
  filterButton.classList.add("select-filter");
  filterButton.setAttribute("id", "button-filter");
  filterButton.innerHTML = "Apply";
  filterButton.addEventListener("click", (e) => {
    const fInput = e.target.previousSibling;
    const predicate = fInput.value;
    const fMenu = fInput.previousSibling;
    const filterOp = fMenu.value;
    const filteredplayers = filterBy(
      getRoster(),
      predicate,
      KEY_ENUM[filterOp]
    );
    update(filteredplayers);
  });

  const container = document.getElementsByClassName("select-filter");
  container[0].appendChild(filterMenu);
  container[0].appendChild(filterInput);
  container[0].appendChild(filterButton);
};

const generatePlayerForm = () => {
  return `
  <h2>Enroll player</h2>
  <form>
  <table>
    <tr>
      <td>Name:</td>
      <td><input type="text" name="name"></td>
    </tr>
    <tr>
      <td>Breed:</td>
      <td><input type="text" name="breed"></td>
    </tr>
    <tr>
      <td>Status:</td>
      <td><input type="text" name="status"></td>
    </tr>
    <tr>
      <td>Team ID:</td>
      <td><input type="text" name="team-id"></td>
    </tr>
    <tr>
      <td>Age:*Must be under age limit</td>
      <td><input type="text" name="age-limit"></td>
    </tr>
    <tr>
      <td>Vaccinations upto date:</td>
      <td><input type="checkbox" name="vaccinated"></td>
    </tr>
    <tr>
      <td>Choose a profile picture:<img src="" id="preview-avatar" height="200" alt="Image preview" /></td>
    </tr>
    <tr>
      <td>*supported ext: .jpeg .png</td>
      <td><input type="file" id="avatar" name="avatar"
        accept="image/png, image/jpeg, image/jpg"></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" value="Submit"></td>
    </tr>
  </table>
</form>`;
};

const generateTeam = (teamId, teamName, players) =>{
  const team = {
    id: teamId,
    name: teamName,
    score: 10,
    createdAt: new Date().toISOString,
    updatedAt: "",
    cohortId: 221,
    players: players
  }
  return team;
};

const generateCutePoopies = (...val) => {
  return {
    id: val[0],
    name: val[1],
    breed: val[2],
    status: val[3],
    imageUrl: val[4],
    createdAt: val[5],
    updatedAt: val[6],
    teamId: val[7],
    cohortId: val[8],
  };
};

const generateRandomPlayer = () => {
  const prefixedID = Number("113" + randomNumber(9999));
  const name = "PatsTestTubePoopies#2";
  const breed = "Pomsky";
  const url = "https://s.hdnux.com/photos/46/70/11/10191479/4/1200x0.jpg";
  const date = new Date().toISOString();
  return generateCutePoopies(prefixedID, name, breed, "field", url, date, "");
};

function randomNumber(range = 1) {
  return Math.floor(Math.random() * range);
}
init();
/**
 pID}
pName}
${player.breed}
${player.status}
${player.imageUrl}
${player.createdAt}
${player.updatedAt}
${player.teamId}
${player.cohortId}
 * 
 * 
function printObjectProperties(obj) {
    for (let prop in obj) {
      if (typeof obj[prop] === "object") {
        console.log(prop);
        printObjectProperties(obj[prop]);
      } else {
        console.log(prop + ": " + obj[prop]);
      }
    }
}

function flattenObject(obj, arr = []) {
    for (let prop in obj) {
      if (typeof obj[prop] === "object" && obj[prop] !== null) {
        arr.push({prop});
        flattenObject(obj[prop], arr);
      } else {
        arr.push({[prop]: obj[prop]});
      }
    }
    return arr;
}
  
 * 
 * 
 * 
 * 
 */
