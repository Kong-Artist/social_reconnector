var Dispatcher = new Flux.Dispatcher();
var URL = "https://0143f8a9.ngrok.io";

var Actions = {
    // _fetchFriends: function() {
    //     $.getJSON("/api/friends")
    //       .done(function(res) {
    //         Dispatcher.dispatch({
    //           actionType: "get-friends",
    //           data: res
    //         })
    //         console.log(res);
    //       }).fail(function(err) {
    //         console.log(err);
    //       });
    // },
    getFriends: function() {
        // var self = this;
        // $.post("/api/login", {token: token})
        // .done(function() {
        //     self._fetchFriends();
        // })
        // .fail(function() {
        //     self._fetchFriends();
        // })
        $.getJSON("/api/friends")
          .done(function(res) {
            Dispatcher.dispatch({
              actionType: "get-friends",
              data: res
            })
            console.log(res);
          }).fail(function() {
            console.log("failed");
          });
    },
    getRecommendations: function(id) {
      $.getJSON("/api/topics/" + id)
        .done(function(res) {
          Dispatcher.dispatch({
            actionType: "get-recommendations",
            data: res
          })
          console.log(res);
        })
        .fail(function(err) {
          console.log(err);
        });
    }
}
