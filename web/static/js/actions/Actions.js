var Dispatcher = new Flux.Dispatcher();
var URL = "https://0143f8a9.ngrok.io";

// var data = [
//   {"name":"John Doe", "thumb":"Picture of John"},
//   {"name":"Ariadne Grande", "thumb":"Picture of Ariadne"},
//   {"name":"Taylor Swift", "thumb":"Picture of Taylor"},
//   {"name":"John Doe", "thumb":"Picture of John"},
//   {"name":"Ariadne Grande", "thumb":"Picture of Ariadne"},
//   {"name":"Taylor Swift", "thumb":"Picture of Taylor"}
// ];

var recommendation = {};


var Actions = {
    getFriends: function() {
      $.getJSON("/api/friends")
          .done(function(res) {
              Dispatcher.dispatch({
                actionType: "get-friends",
                data: res.data
              })
          }, function(err) {
              console.log(err);
          });
        
    },
    getRecommendations: function(id) {
      // stuff with ajax

      Dispatcher.dispatch({
        actionType: 'get-recommendations',
        recommendation: recommendation
      })
    }
}
