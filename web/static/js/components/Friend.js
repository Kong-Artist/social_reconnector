var Friend = React.createClass({
	displayName: "Friend",
    clickFriend: function() {
        Actions.getRecommendations(this.props.id);
    },
    render: function() {
        return (
            <div className="friend" onClick={this.clickFriend}>
				<img src={this.props.avatar}></img>
                <div className="full-name">
                    <b>{this.props.name}</b>
                </div>
                <div className="thumbnail">
                	{this.props.child}
                </div>
            </div>
        );
    }
});
