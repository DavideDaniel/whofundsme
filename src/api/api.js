import 'isomorphic-fetch';

export function getTwitterInfo(twitter_id){
  // twitterClient.get(`users/show.json?screen_name=${twitter_id}`,(e,r)=>{
  //   console.log(r);
  // })
}

export function readData(searchTerm) {
  console.log('inside fetch ' + searchTerm)
  return fetch(`http://localhost:3000/api/legislators?state=${searchTerm}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'request'
      }
    })
    .then(response => {
      console.log('Received : ' + response);
      console.log('Response status: ' + response.status);
      console.log('Response statusText: ' + response.statusText);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(response => {
      return response.json();
    });

}

export function getCandidate(crp_id) {
  console.log('inside fetch '+crp_id)
  return fetch(`http://localhost:3000/api/legislatorByCrpId/${crp_id}/`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'request'
      }
    })
    .then(response => {
      console.log('Received : ' + response);
      console.log('Response status: ' + response.status);
      console.log('Response statusText: ' + response.statusText);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(response => {
      return response.json();
    });

}