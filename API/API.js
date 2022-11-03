import AsyncStorage from '@react-native-async-storage/async-storage';
const apidata = require('./APIdata.json');
const apibaseurl = "https://api.globalstats.io/";
var access_token;
var access_token_expiry;
var access_token_time;
var user_id;
var user_name;

async function loaduserid() {
    try {
        const value = await AsyncStorage.getItem('userid');
        if(value !== null) {
            user_id = JSON.parse(value);
        }
    } catch(e) {

    }
}

async function setuserid() {
    try {
        await AsyncStorage.setItem('userid', JSON.stringify(user_id));
    } catch(e) {

    }
}

async function loadusername() {
    try {
        const value = await AsyncStorage.getItem('username');
        if(value !== null) {
            user_name = JSON.parse(value);
        }
    } catch(e) {
        console.log(e);
    }
}

async function setusername(username) {
    try {
        await AsyncStorage.setItem('username', JSON.stringify(username));
        user_name = username;
    } catch(e) {

    }
}

async function requestaccesstoken(){
    return fetch(apibaseurl + 'oauth/access_token', 
    {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'scope': 'endpoint_client',
            'client_id': apidata.id,
            'client_secret': apidata.secret
        }).toString()
    })
    .then((response) => response.json())
    .then((json) => {
        access_token = json.access_token;
        access_token_expiry = json.expires_in;
        access_token_time = new Date().getTime() / 1000;
    })
    .catch((error) => {
      console.error(error);
    });
}

function checkaccesstoken(): Boolean{
    return ((new Date().getTime() / 1000) - access_token_time) < access_token_expiry;
}

function checkuserid(): Boolean{
    return (user_id !== undefined);
}

function checkusername(): Boolean{
    return (user_name !== undefined);
}

async function addhighscore(score: Number){
    if(!checkaccesstoken()){
        await requestaccesstoken();
    }
    return fetch(apibaseurl + 'v1/statistics', 
    {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
            "name":user_name,
            "values":
            {
                "score":score
            }
        })
    })
    .then((response) => response.json())
    .then((json) => {
        user_id = json._id;
        setuserid();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function modifyhighscore(score: Number){
    if(!checkaccesstoken()){
        await requestaccesstoken();
    }
    return fetch(apibaseurl + `v1/statistics/${user_id}`, 
    {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
            "values":
            {
                "score":score
            }
        })
    })
    .then((response) => response.json())
    .then((json) => {

    })
    .catch((error) => {
      console.error(error);
    });
}

async function getleaderboard(){
    if(!checkaccesstoken()){
        await requestaccesstoken();
    }
    return fetch(apibaseurl + `v1/statistics/${user_id}/section/score` , 
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        }
    });
}

export default {
    loaduserid,requestaccesstoken,checkuserid,addhighscore,getleaderboard,modifyhighscore,setusername,loadusername,checkusername
};
