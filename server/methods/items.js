
Meteor.methods({
    newItem() {//to call when creating a new Item
        return Items.insert( {} ); //works thanks to schema
    },
    saveItem( item ) { //schema deactivated for the moment
        check( item, Object );
        console.log(JSON.stringify(item));
        let itemId = item._id, lang = item.lang ;
        delete item._id; //to delete the _id value we upsert, object lighter

        var itemCustom = {
            ["content." + lang]:{ //computed values mandatory to use dot notation in MongoDB (ECMA2015)
                author: item.author,
                date: (new Date()).toISOString(),
                origin: "http://www.anegdot.co",
                text: item.text,
                title: item.title
            }
        };

        Items.upsert( itemId, { $set: itemCustom});
    }
});