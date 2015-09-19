var FriendList = React.createClass({
  render: function() {
    console.log(this.props);
    var friendNodes = this.props.data.map(function (friend) {
      return (
        <Friend name={friend.name}>
          {friend.thumb}
        </Friend>
      );
    });
    return (
      <div className="friend-list-container">
        This is the parent container.
        <div className="friend-list">
          {friendNodes}
        </div>
      </div>
    );
  }
});
