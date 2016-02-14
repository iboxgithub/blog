ItemsList = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let subscription = Meteor.subscribe( 'items', this.props.lang );//SPECIFIC

        return {
            isLoading: !subscription.ready(),
            items: Items.find().fetch() //SPECIFIC
        };
    },handleNewItem() {
        let lang = this.props.lang;
        Meteor.call( 'newItem', ( error, itemId ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                FlowRouter.go( `/items/${ lang }/edit/${ itemId }` );
                Bert.alert( 'All set! Get to typin\'', 'success' );
            }
        });
    },
    render() {
        let currentUser = Meteor.user();
        let listStyle = {
            listStyleType: 'none' //to remove dots in front of elements of ul (li)
        };

        if ( this.data.isLoading ) {
            return <Loading />;
        } else {
            return (
                <div className="items">
                    { currentUser ?
                        <input className="btn btn-success" type="button" value="New Item" onClick={ this.handleNewItem } /> : ''
                    }
                    <ul style={listStyle}>
                        {this.data.items.map( ( item ) => { //todo:to update regarding DB
                            console.log('fe ' + item._id.toString());
                            return <Item key={item._id.toString()} item={item} lang={this.props.lang} />;
                        })}
                    </ul>
                </div>
            );
        }
    }
});