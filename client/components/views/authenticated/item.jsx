

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
    handleDetail( event ) {
        event.preventDefault();
        let _id = this.props.item._id.toString();
        let lang = this.props.lang;
        FlowRouter.go('item-detail',{lang:lang, _id:_id})
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
                        <div className="icons">
                            { currentUser ?
                            <i className="fa fa-globe fa-2x" value="Translate" onClick={ this.handleTranslate }></i>
                                :''//<a href={'/items/' + lang + '/edit/' + _id}>TRANSLATE</a> : ''
                            }
                            <i className="fa fa-info-circle fa-2x"type="button" value="Detail" onClick={ this.handleDetail } ></i>

                        </div>
                    </div>
                    <div className="panel-body">
                        <p> {text} </p>
                    </div>
                </div>
            </li>
        );
    }
});

/*{ currentUser ?
 <input className="btn btn-warning" type="button" value="Translate" onClick={ this.handleTranslate } />:''//<a href={'/items/' + lang + '/edit/' + _id}>TRANSLATE</a> : ''
 }
 <input className="btn btn-success" type="button" value="Detail" onClick={ this.handleDetail } />*/