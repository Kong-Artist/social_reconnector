var App = React.createClass({
  displayName: "App",
  propTypes: {
    initialPage: React.PropTypes.string // login, friends, results
  },
  data: [
    {"name":"John Doe", "thumb":"Picture of John"},
    {"name":"Ariadne Grande", "thumb":"Picture of Ariadne"},
    {"name":"Taylor Swift", "thumb":"Picture of Taylor"}
  ],
  getInitialState: function() {
    return {
      page: this.props.initialPage || 'login'
    }
  },
  render: function() {
    if(this.state.page == "login") {
      return (
        <Login />
      )
    }
    else if(this.state.page == "friends") {
      return (
        <FriendList data={this.data} />
      )
    }
    else if(this.state.page == "results") {
      return (
        <Results />
      )
    }
  }
});

React.render(
  React.createElement(
    App, {
      initialPage: 'friends',//'login'
      url: 'public/friends.json'
    }
  ),
  document.getElementById('app')
)
