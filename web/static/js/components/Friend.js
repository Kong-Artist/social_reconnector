var Friend = React.createClass({
	displayName: "Friend",
    clickFriend: function() {
        Actions.getRecommendations(this.props.id);
    },
    render: function() {
		console.log(this.props.avatar)
        return (
            <div className="friend text-align-left" onClick={this.clickFriend}>
				<img src={this.props.avatar} className="thumbnail"></img>
                <div className="full-name">
                    <p>{this.props.name}</p>
                </div>
            </div>
        );
    }
});
