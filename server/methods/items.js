/**
 * Created by ibox on 06/02/16.
 */
Meteor.methods({
    newItem() {//to call when creating a new Item
        return Items.insert( {} ); //works thanks to schema
    },
    saveItemTo( item ) { //schema deactivated for the moment
        check( item, Object );
        console.log(JSON.stringify(item));
        let itemId = item._id, langFrom = item.langFrom, langTo = item.langTo ;
        delete item._id; //to delete the _id value we upsert, object lighter

        var itemCustom = {
            ["content." + langTo]:{ //computed values mandatory to use dot notation in MongoDB (ECMA2015)
                author: item.authorTo,
                date: (new Date()).toISOString(),
                origin: "http://www.anegdot.co",
                text: item.textTo,
                title: item.titleTo
            }
        };

        //console.log(JSON.stringify(itemCustom, null, 4));

        Items.upsert( itemId, { $set: itemCustom});
    }
});