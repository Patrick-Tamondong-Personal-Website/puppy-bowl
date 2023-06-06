const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Use the APIURL variable for fetch requests
const PLAYERURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/players`;

const TEAMURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/teams`;
var playerRoster;
var TEAM_ID = 420;
var COHORT_ID = 221;

var KEY_ENUM = Object.freeze({
  "ID":0,
  "NAME":1,
  "BREED":2,
  "STATUS":3,
  "IMAGE":4,
  "CREATE":5,
  "UPDATE":6,
  "TEAM":7,
  "COHORT":8,
  "NONE":9
})
var REVERSE_ENUM=Object.freeze({
  "TRUE": true,
  "FALSE": false
})

const validatedURL = (api_param, id_param) => {
  const validatedId = (id_param) => {
    const idPattern = new RegExp(/^\d{2}\d+$/);
    if (idPattern.test(String(id_param))) {
      return String(id_param);
    } else {
      throw new Error("Invalid ID");
    }
  };
  return id_param === "" ? api_param : api_param + "/" + validatedId(id_param);
}

const sendRequest = async (api, id = "", options = {}) => {
  let fetchOptions = { method: "GET", ...options };
  try{
    const resp = await fetch(validatedURL(api, id), fetchOptions);
    console.log(resp);
    const data = await resp.json();
    console.log(data);
    return data;
  }catch(err){
    console.error(err);
    throw new Error("Failed to fetch data");
  }
};
const updateRoster = async () => {
  const playersData = await sendRequest(PLAYERURL);
  playerRoster = playersData.data.players;
};
const getRoster = () => {return playerRoster;};

const checkRoster = async(id) => {
  const req = await sendRequest(PLAYERURL,id);
  return await req.success
}
const getPlayer = async(id) => {
  if(playerRoster.some(el => el.id === id))return true;
  const req = await sendRequest(PLAYERURL,id);
  return await req.data;
}

const addNewPlayer = async (data) => {
  console.log('Adding');
  
  console.log(data)
  if(!await checkRoster(data.id)){
    data.updatedAt= new Date().toISOString();
    const req = await sendRequest(PLAYERURL,'', {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(req);
  }
}     
const updatePlayer = async (data) => {
  console.log(data)
  if(!await checkRoster(data.id)){
    data.updatedAt= new Date().toISOString();
    const req = await sendRequest(PLAYERURL,'', {
      method: "PUT", // or 'PUT'
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    return req;
  }else{console.log("Pupper with ID already in roster")}
};

const deletePlayer = async (id) => {
  try {
    await sendRequest(PLAYERURL,id,{method: 'DELETE',})
  }catch(err){
    console.error(`Whoops, trouble removing player #${playerId} from the roster!`,err);
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
  const playerCard = document.createElement('div');
    playerCard.classList.add("player-card");
    playerCard.innerHTML=`<div class="content">
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

 return playerCard
}

const renderAllPlayers = (playerList) => {
  try {
    playerList.forEach( player => {
    playerContainer.append(renderCard(player));
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

const renderNewPlayerForm = () => {

  try {
   newPlayerFormContainer.innerHTML = generatePlayerForm();
   const buttonSubmit = newPlayerFormContainer.querySelector('input[type="submit"]');
   console.log("Submit")
   console.log(buttonSubmit);
   buttonSubmit.addEventListener("click", function (e) {
    console("Submit clicked")
   })
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const sortBy = (players, sort_value=KEY_ENUM.NONE,reverse=REVERSE_ENUM.FALSE) => {
  const option = sort_value;
  let sortedRoster = [...players]
  if(sort_value!==KEY_ENUM.NONE){
       sortedRoster = players.sort((a,b) => (a[Object.keys(a)[option]] > b[Object.keys(b)[option]]) ? 1 : ((b[Object.keys(b)[option]] > a[Object.keys(a)[option]]) ? -1 : 0))
  }
  if(reverse)return sortedRoster.reverse();
  return sortedRoster;
}

const filterBy = (players,value,option=KEY_ENUM.NONE) => {
  let predicate = String(value).toLowerCase();
  let filteredRoster = [...players]
  if(option!==KEY_ENUM.NONE){
       filteredRoster = players.filter(player => String(player[Object.keys(player)[option]]).toLowerCase().includes(predicate));
  }
  return filteredRoster;
}

await updateRoster();
const init = async () => {
  generateSelectSort();
  generateSelectFilter()
  const players = getRoster();
  renderAllPlayers(players);
  renderNewPlayerForm();
 //addNewPlayer(generateRandomPlayer())
};
const generateSelectSort = () => {
  const selectMenu = document.createElement('select');
  selectMenu.classList.add('select-sort,options-sort');
  selectMenu.setAttribute('name','sorting')
  const options =`
  <option value="ID">ID</option>
  <option value="NAME">Name</option>
  <option value="BREED">Breed</option>
  <option value="STATUS">Status</option>
  <option value="CREATE">Created</option>
  <option value="UPDATE">Updated</option>
  <option value="TEAM">Team ID</option>
  <option value="COHORT">Cohort ID</option>
  `
  selectMenu.innerHTML = options
  selectMenu.addEventListener("change",(e)=>{
    const selectElement = e.target;
    console.log(selectElement);
    const sortOp = selectElement.value;
    const sortedplayers = sortBy(getRoster(),KEY_ENUM[sortOp]);
    console.log(sortedplayers);
    document.getElementById('all-players-container').innerHTML='';
    renderAllPlayers(sortedplayers);
  })
  /*
  const selectButton = document.createElement('button');
  selectButton.classList.add('select-sort');
  selectButton.setAttribute('id', 'button-sort');
  selectButton.innerHTML="<i class='fas fa-arrow-up-right-dots'></i>";
  selectButton.addEventListener('click', (e)=>{

  })
  */
 const container = document.getElementsByClassName('select-sort');
 container[0].appendChild(selectMenu);
}

const generateSelectFilter = () => {
  const filterMenu = document.createElement('select');
  filterMenu.classList.add('select-filter','options-filter');
  filterMenu.setAttribute('name','filtering')
  const options =`
  <option value="ID">ID</option>
  <option value="NAME">Name</option>
  <option value="BREED">Breed</option>
  <option value="STATUS">Status</option>
  <option value="CREATE">Created</option>
  <option value="UPDATE">Updated</option>
  <option value="TEAM">Team ID</option>
  <option value="COHORT">Cohort ID</option>
  `
  filterMenu.innerHTML = options
  
  const filterInput = document.createElement('input');
  filterInput.classList.add('select-filter');
  filterInput.setAttribute('id','input-filter')

  const filterButton = document.createElement('button');
  filterButton.classList.add('select-filter');
  filterButton.setAttribute('id', 'button-filter');
  filterButton.innerHTML="filter";
    filterButton.addEventListener("click", (e)=>{    
    const fInput = e.target.previousSibling;
    const predicate = fInput.value;
    const fMenu = fInput.previousSibling;
    const filterOp = fMenu.value;    
    const filteredplayers = filterBy(getRoster(),predicate,KEY_ENUM[filterOp]);
    console.log(filteredplayers);
    document.getElementById('all-players-container').innerHTML='';
    renderAllPlayers(filteredplayers);
  })
  
  
  filterMenu.addEventListener("change",(e)=>{
    const filterElement = e.target;
    console.log(filterElement);
  })
 const container = document.getElementsByClassName('select-filter');
 container[0].appendChild(filterMenu);
 container[0].appendChild(filterInput);
 container[0].appendChild(filterButton);
}

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
      <td>Choose a profile picture:</td>
    </tr>
    <tr>
      <td>*supported ext: .jpeg .png</td>
      <td><input type="file" id="avatar" name="avatar"
        accept="image/png, image/jpeg"></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" value="Submit"></td>
    </tr>
  </table>
</form>`;
}
const generateCutePoopies = (_id, _name, _breed,_status,_imageUrl,_createdAt,_updatedAt) =>{
  return {id:_id,
          name:_name,
          breed:_breed,
          status:_status,
          imageUrl:_imageUrl,
          createdAt:_createdAt,
          updatedAt:_updatedAt,
          teamId:TEAM_ID,
          cohortId:COHORT_ID}
};

function randomNumber(range=1){return Math.floor(Math.random()*range)};
  const generateRandomPlayer = () => {
    const prefixedID = Number('113'+ randomNumber(9999));
    const name = "PatsTestTubePoopies#2";
    const breed = "Pomsky"
    const url = "https://s.hdnux.com/photos/46/70/11/10191479/4/1200x0.jpg";
    const date = new Date().toISOString();
    return generateCutePoopies(prefixedID,name,breed,'field',url,date,'');
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