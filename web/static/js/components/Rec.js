var Rec = React.createClass({
	displayName: "Recommendation",
    render: function() {
        return (
            <div className="recommendation text-align-left">
                <h2>{this.props.name}</h2>
            </div>
        );
    }
});
