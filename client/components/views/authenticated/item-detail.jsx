

ItemDetail = React.createClass({
    propTypes: {
        itemId: React.PropTypes.string.isRequired
    },
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let sub = Meteor.subscribe( 'item-detail', this.props.itemId );
        var item = Items.findOne( { _id: this.props.itemId } );

        return {
            item: item
        };
    },
    render() {
        /*
         ---------------------- GENERIC
         todo: update with DB this.props.item._id._str.toString();
         */

        if ( !this.data.item ) { return <div>Item loading...</div>; }

        let _id = this.data.item._id.toString(); //valueOf();
        let currentUser = Meteor.user();
        /*
         ---------------------- END GENERIC
         */
        let title = !!this.data.item.content[this.props.lang] ? this.data.item.content[this.props.lang].title : 'Unknown content';
        let text = !!this.data.item.content[this.props.lang] ? this.data.item.content[this.props.lang].text : 'Unknown content';
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    <div className= "title">
                         {title}
                    </div>
                </div>
                <div className="panel-body">
                    {text}
                </div>
            </div>
        );
    }
});