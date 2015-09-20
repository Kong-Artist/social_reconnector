var FriendList = React.createClass({
  render: function() {
    var friendNodes = this.props.friends.map(function (friend) {
      return (
        <div>
          <Friend name={friend.name} id={friend.id}/>
          {friend.thumb}
        </div>
      );
    });
    return (
      <div>
        <h1>Your friends</h1>
        <div className="friend-list-container padding">
          {friendNodes}
        </div>
      </div>
    );
  }
});
