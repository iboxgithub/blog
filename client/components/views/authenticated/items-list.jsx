ItemsList = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let subscription = Meteor.subscribe( 'items' );//SPECIFIC

        return {
            isLoading: !subscription.ready(),
            items: Items.find().fetch() //SPECIFIC
        };
    },
    render() {
        if ( this.data.isLoading ) {
            return <Loading />;
        } else {
            return (
                <div className="items">
                    <ul>
                        {this.data.items.map( ( item ) => {
                            return <Item key={item._id._str.toString()} item={item}  />;
                        })}
                    </ul>
                </div>
            );
        }
    }
});