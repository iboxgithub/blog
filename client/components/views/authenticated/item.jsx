

Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        lang: React.PropTypes.string.isRequired
    },
    componentDidMount() {
        //Modules.client.anegdot( { form: "#anegdot" } );
    },
    handleTranslate( event ) {
        event.preventDefault();
        let _id = this.props.item._id.toString();
        let lang = this.props.lang;
        let author = !!this.props.item.content[lang] ? this.props.item.content[lang].author : 'Unknown author';
        FlowRouter.go('editor',{lang:lang, _id:_id})
    },
    render() {
        /*
        ---------------------- GENERIC
        todo: update with DB this.props.item._id._str.toString();
         */
        let _id = this.props.item._id.toString(); //valueOf();
        let currentUser = Meteor.user();
        /*
         ---------------------- END GENERIC
         */

        let lang = this.props.lang;
        let author = !!this.props.item.content[lang] ? this.props.item.content[lang].author : 'Unknown author';
        let text = !!this.props.item.content[lang] ? this.props.item.content[lang].text : 'Unknown content';
        let title = !!this.props.item.content[lang] ? this.props.item.content[lang].title : 'Unknown content';

        return (
            <li>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div>
                            {title}
                        </div>
                        { currentUser ?
                            <input className="btn btn-warning" type="button" value="Translate" onClick={ this.handleTranslate } />:''//<a href={'/items/' + lang + '/edit/' + _id}>TRANSLATE</a> : ''
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