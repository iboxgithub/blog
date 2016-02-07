

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
        todo: update with DB this.props.item._id._str.toString();
         */
        let _id = this.props.item._id.toString();
        let currentUser = Meteor.user();
        /*
         ---------------------- END GENERIC
         */

        let lang = 'FR', langTo = 'EN';
        let author = !!this.props.item.content ? this.props.item.content[lang].author : 'Unknown author';
        let text = !!this.props.item.content ? this.props.item.content[lang].text : 'Unknown content';

        return (
            <li>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div>
                            {_id} created by {author} for lang {lang}
                        </div>
                        { currentUser ?
                            <a href={'/items/edit/' + _id}>TRANSLATE</a> : ''
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