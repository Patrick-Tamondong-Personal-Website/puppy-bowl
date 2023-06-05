    var KEY_ENUM=Object.freeze({
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
    });

    const str = "COHORT";
    console.log(KEY_ENUM[str])
/*
    const filterBy = (players,value,option='') => {
        let predicate = String(value).toLowerCase();
        let filteredRoster = [...players]
        if(option!==''){
             filteredRoster = players.filter(player => String(player[Object.keys(player)[option]]).toString().includes(predicate));
        }
        return filteredRoster;
      }

const players = 
[{id:3969,name:"Anise",breed:"Australian Cattle Dog / Labrador Retriever",status:"field",imageUrl:"http://r.ddmcdn.com/w_912/s_f/o_1/cx_51/cy_0/cw_912/ch_1368/APL/uploads/2019/12/Anise-PBXVI.jpg",createdAt:"2023-05-09T02:46:58.444Z",updatedAt:"2023-05-09T02:46:58.444Z",teamId:375,cohortId:221},{id:3970,name:"Bert",breed:"Great Pyrenees / Weimaraner",status:"field",imageUrl:"http://r.ddmcdn.com/w_1010/s_f/o_1/cx_0/cy_4/cw_1010/ch_1515/APL/uploads/2019/12/Bert-PBXVI.jpg",createdAt:"2023-05-09T02:46:58.444Z",updatedAt:"2023-05-09T02:46:58.444Z",teamId:375,cohortId:221},
 {id:3975,name:"Gina",breed:"Labrador Retriever / Chow Chow",status:"bench",imageUrl:"http://r.ddmcdn.com/w_1012/s_f/o_1/cx_0/cy_0/cw_1012/ch_1518/APL/uploads/2019/12/Gina-PBXVI.jpg",createdAt:"2023-05-09T02:46:58.444Z",updatedAt:"2023-05-09T02:46:58.444Z",teamId:375,cohortId:221},{id:3976,name:"Huck",breed:"Miniature Poodle / Shih Tzu",status:"bench",imageUrl:"http://r.ddmcdn.com/w_962/s_f/o_1/cx_25/cy_0/cw_962/ch_1443/APL/uploads/2019/12/Huck-PBXVI.jpg",createdAt:"2023-05-09T02:46:58.444Z",updatedAt:"2023-05-09T02:46:58.444Z",teamId:375,cohortId:221},{id:3977,name:"Jack",breed:"Chihuahua / Miniature Poodle",status:"bench",imageUrl:"http://r.ddmcdn.com/w_926/s_f/o_1/cx_42/cy_0/cw_926/ch_1389/APL/uploads/2019/12/Jack-PBXVI.jpg",createdAt:"2023-05-09T02:46:58.444Z",updatedAt:"2023-05-09T02:46:58.444Z",teamId:375,cohortId:221},
 {id:6811,name:"PatsTestTubePupper#1",breed:"Pomsky",status:"field",imageUrl:"https://i0.wp.com/petradioshow.com/wp-content/uploads/2020/02/mya2.jpg?resize=396%2C484&ssl=1",createdAt:"2023-06-03T04:17:02.720Z",updatedAt:"2023-06-03T04:17:02.720Z",teamId:420,cohortId:221},{id:6822,name:"Can I join?",breed:"Prairie dog",status:"bench",imageUrl:"https://cdn.pixabay.com/photo/2018/05/16/10/22/prairie-dog-3405379_1280.jpg",createdAt:"2023-06-03T04:43:38.713Z",updatedAt:"2023-06-03T04:43:38.713Z",teamId:435,cohortId:221},{id:6824,name:"Heck yeah you can join,TeamID 420",breed:"Pomsky",status:"field",imageUrl:"https://s.hdnux.com/photos/46/70/11/10191479/4/1200x0.jpg",createdAt:"2023-06-03T04:50:51.219Z",updatedAt:"2023-06-03T04:50:51.219Z",teamId:420,cohortId:221}];

const sortedplayers = filterBy(players,'fiel',3);
console.table(sortedplayers);
console.log(9===KEY_ENUM.NONE)
console.log(String(72).toLowerCase());
let player = players[1];
let a = player[3]
console.log(a)
*/