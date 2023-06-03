const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-acc-pt-web-pt-a";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
var playerRoster;
var TEAM_ID = 420;
var COHORT_ID = 221;

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
  try {
    const resp = await fetch(validatedURL(api, id), fetchOptions);
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch data");
  }
};
const updateRoster = async () => {
  const playersData = await sendRequest(APIURL);
  playerRoster = playersData.data.players;
};
const getRoster = () => {return playerRoster;};

const checkRoster = async(id) => {
  const req = await sendRequest(APIURL,id);
  return await req.success
}
const getPlayer = async(id) => {
  if(playerRoster.some(el => el.id === id))return true;
  const req = await sendRequest(APIURL,id);
  return await req.data;
}

const addNewPlayer = async (data) => {
  console.log(data)
  if(!await checkRoster(data.id)){
    data.updatedAt= new Date().toISOString();
    const req = await sendRequest(APIURL,'', {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    return req;
  } else {console.log("Pupper with ID already in roster")}
};

const deletePlayer = async (id) => {
  try {
    await sendRequest(APIURL,id,{
      method: 'DELETE',
    }
   )
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
     





/**
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


/*
  const id = ${player.id}
  ${player.name}
  ${player.breed}
  ${player.status}
  ${player.imageUrl}
  ${player.createdAt}
  ${player.updatedAt}
  ${player.teamId}
  ${player.cohortId}
*/

 //return playerCard
}

const renderAllPlayers = (playerList) => {
  try {
    
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
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};
await updateRoster();
const init = async () => {
  
  const players = getRoster();
  console.log(players)
  //const testtube2 = generateRandomPlayer();
 //console.log(testtube2);
  console.log(await getPlayer(6811));
};


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