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
        // ajax
        Dispatcher.dispatch({
            actionType: 'get-friends',
            data: data
        })
    }
}
