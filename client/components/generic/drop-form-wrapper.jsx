DropFormWrapper = React.createClass({
    propTypes: {
        lang: React.PropTypes.string.isRequired,
        item: React.PropTypes.object.isRequired,
        src: React.PropTypes.string.isRequired
    },
    handleSubmit( event ) {
        event.preventDefault();
    },
    componentDidMount() {
        let validations = this.props.validations;

        if ( validations ) {
            $( this.refs.form ).validate( validations );
        }
    },
    render() {
        return (hello
    );
    }
});