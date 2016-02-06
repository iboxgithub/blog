

Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        //Modules.client.anegdot( { form: "#anegdot" } );
    },
    /*handleSubmit( event ) {
        event.preventDefault();
    },*/
    render() {
        /*
        ---------------------- GENERIC
         */
        let _id = this.props.item._id._str.toString();
        let currentUser = Meteor.user();
        /*
         ---------------------- END GENERIC
         */

        let lang = 'FR', langTo = 'EN';
        let author = this.props.item.content[lang].author;
        let text = this.props.item.content[lang].text;

        return (
            <li>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div>
                            {this.props.item._id._str.toString()} created by {author} for lang {lang}
                        </div>
                        { currentUser ?
                            <a href={'/edit/' + _id}>TRANSLATE</a> : ''
                        }

                    </div>
                    <div className="panel-body">
                        {text}
                    </div>
                </div>
            </li>
        );
    }
});