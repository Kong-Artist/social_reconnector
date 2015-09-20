var Rec = React.createClass({
	displayName: "Recommendation",
    render: function() {
        return (
            <div className="recommendation">
                {this.props.name}
            </div>
        );
    }
});
