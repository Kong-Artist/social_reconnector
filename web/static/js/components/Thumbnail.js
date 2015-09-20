var Thumbnail = React.createClass({
    displayName: 'Thumbnail',
    propTypes: {
        href: React.PropTypes.string
    },
    render: function() {
        return (
            <div>
                <img src={this.props.href} className="thumbnail circle"></img>
            </div>
        );
    }
});
