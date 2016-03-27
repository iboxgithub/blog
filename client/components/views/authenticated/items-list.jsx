ItemsList = React.createClass({
    getInitialState: function() {
        return {
            limit: 2//, //todo: put user favorite lang
        };
    },mixins: [ ReactMeteorData ],
    getMeteorData() {
        let subscription = Meteor.subscribe( 'items', this.props.lang, this.state.limit );//SPECIFIC

        return {
            isLoading: !subscription.ready(),
            items: Items.find().fetch() //SPECIFIC
        };
    },
    componentDidMount(){
        //Session.set("lang",this.props.lang);
    },
    handleNewItem() {
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
    handleLoad(event) {
        event.preventDefault();
        var limit = this.state.limit;
        this.setState({limit: limit + 10});
    },
    render() {
        let currentUser = Meteor.user(), admin = false;
        let listStyle = {
            listStyleType: 'none', //to remove dots in front of elements of ul (li)
            padding: 0 //to avoid padding to the left border
        };
        if(currentUser && currentUser._id == 'adminIdToDetermineOrSpecificValueInDB')
            admin = true;

        if ( this.data.isLoading ) {
            return <Loading />;
        } else {
            return (
                <div className="items">
                    { admin ?
                        <input className="btn btn-success" type="button" value="New Item" onClick={ this.handleNewItem } /> : ''
                    }
                    <ul style={listStyle}>
                        {this.data.items.map( ( item ) => { //todo:to update regarding DB
                            //console.log('fe ' + item._id.toString());
                            return <Item key={item._id.toString()} item={item} lang={this.props.lang} />;
                        })}
                    </ul>
                    <a className="load-more" type="button" title="Load 10 more items"  onClick={ this.handleLoad }>Load more</a>
                </div>

            );
        }
    }
});