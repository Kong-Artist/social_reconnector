var Dispatcher = new Flux.Dispatcher();

var data = [
  {"name":"John Doe", "thumb":"Picture of John"},
  {"name":"Ariadne Grande", "thumb":"Picture of Ariadne"},
  {"name":"Taylor Swift", "thumb":"Picture of Taylor"},
  {"name":"John Doe", "thumb":"Picture of John"},
  {"name":"Ariadne Grande", "thumb":"Picture of Ariadne"},
  {"name":"Taylor Swift", "thumb":"Picture of Taylor"}
];


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
    }
}
