var App = React.createClass({
  displayName: "App",
  propTypes: function() {
    initialPage: React.PropTypes.string // login, friends, results
  },
  loadFriendsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {    
    console.log("SOmething");
    if (this.state.page == "friends") {
      console.log(this.data);
      this.loadFriendsFromServer();
      setInterval(this.loadFriendsFromServer, 2000);
    }
  },
  getInitialState: function() {
    return {
      page: this.props.initialPage || 'login',
      data: []
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
        <FriendList data={this.state.data} />
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
      url: 'friends.json'
    }
  ),
  document.getElementById('app')
)
