var Friend = React.createClass({
	displayName: "Friend",
    render: function() {
        return (
            <div className="friend" onClick={Actions.getRecommendations(this.props.id)}>
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
