Editor = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {

        //var test = new ObjectId(this.props.itemId);
        Meteor.subscribe( 'item', this.props.itemId );

        //console.log(this.props.itemId);

        return {
            item: Items.findOne( { _id: this.props.itemId } )
        };
    },
    validationsFrom() {

    },
    validationsTo() {
        //console.log('rre');
        let component = this;

        return {
            rules: {
                itemTitle: {
                    required: true
                }
            },
            messages: {
                itemTitle: {
                    required: "Hang on there, an item title is required!"
                }
            },
            submitHandler() {
                let { getValue, isChecked } = ReactHelpers;

                let form = component.refs.editItemFormTo.refs.form,
                    item = {
                        _id: component.props.itemId,
                        authorTo:Meteor.user()._id,
                        titleTo: getValue( form, '[name="itemTitleTo"]' ),
                        textTo: getValue( form, '[name="itemContentTo"]' ),
                        publishedTo: isChecked( form, '[name="itemPublishedTo"]' ),
                        //todo: [langTo] When we loose session we keep the good dropdown value BUT the session is reseted so EN everytime
                        langTo: Session.get('dropdownTo')
                    };

                Meteor.call( 'saveItemTo', item, ( error, response ) => {
                    if ( error ) {
                        Bert.alert( error.reason, 'danger' );
                    } else {
                        Bert.alert( 'Item saved!', 'success' );
                    }
                });
            }
        };
    },
    componentDidMount() {
        //KOs - '[name="editItemForm"]' - '.editItemForm' for class
        // - $('#editItemForm') for id - $(this.refs.form) - $(this.refs.editItemForm.refs.form) - $(this.refs.editItemForm)
        // - var form = ReactDOM.findDOMNode(this.refs.editItemForm);
        //$( this.refs.editItemForm  ).validate(
        /*console.log('Letting this error to come back on the ReactDOM form link later');
        var form = ReactDOM.findDOMNode(this.refs.editItemForm);
        form.validate(
            {
                rules: {
                    itemTitle: {
                        required: true
                    }
                },
                messages: {
                    itemTitle: {
                        required: "Hang on there, an item title is required!"
                    }
                },
                submitHandler() {
                    console.log('submitted');
                    let component = this;
                    let { getValue, isChecked } = ReactHelpers;

                    //todo: check if working
                    let form = component.refs.editItemForm.refs.form,
                        item = {
                            _id: component.props.item
                        };

                    Meteor.call( 'saveItem', item, ( error, response ) => {
                        if ( error ) {
                            Bert.alert( error.reason, 'danger' );
                        } else {
                            Bert.alert( 'Item saved!', 'success' );
                        }
                    });
                }
            }//}

        );*/
        //}
    },
    getLastUpdate() {
        if ( this.data ) {
            let { formatLastUpdate } = ReactHelpers,
                item                 = this.data.item;

            return `${ formatLastUpdate( item.updated ) } by ${ item.author }`;
        }
    },
    getTags() {
        let item = this.data.item;

        if ( item && item.tags ) {
            return item.tags.join( ', ' );
        }
    },
    handleSubmitTo( event ) {
        event.preventDefault();
    },
    handleSubmitFrom( event ) {
        event.preventDefault();
    },
    render() {

        if ( !this.data.item ) { return <div>Item loading</div>; }

        let itemOwner = (Meteor.user()._id === this.data.item.content[this.props.lang].author) ? true : false;

        return (
            <div>
                <p className="updated-date">
                    <strong>Last Updated:</strong> { this.getLastUpdate() }
                </p>

                <table>
                    <thead>
                        <tr>
                            <td>
                                <Dropdown lang={this.props.lang} id="From"/>
                            </td>
                            <td>
                                <Dropdown lang="en" id="To"/>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form ref="editItemFormFrom" id="editItemFormFrom" className="editItemFormFrom" validations={ this.validationsFrom() } onSubmit={ this.handleSubmitFrom }>
                                    <div className="form-group">
                                        <label>
                                            <input type="checkbox" name="itemPublishedFrom" id="#item-published-from"
                                                   value={ this.data.item && this.data.item.published }/>
                                            Published?
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemTitleFrom">Item Title</label>
                                        <input type="text" name="itemTitleFrom" className="form-control" placeholder="Item Title" tabIndex="1"
                                               defaultValue={ this.data.item && this.data.item.title }/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemContentFrom">Item Content</label>
                                        <textarea name="itemContentFrom" className="form-control" placeholder="Item Content" tabIndex="2"
                                                  defaultValue={ this.data.item && this.data.item.content }/>
                                    </div>
                                    { itemOwner ?
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-success" value="Save translation" tabIndex="6"/>
                                        </div> : ''
                                    }

                                </Form>
                            </td>
                            <td>
                                <Form ref="editItemFormTo" id="editItemFormTo" className="editItemFormTo" validations={ this.validationsTo() } onSubmit={ this.handleSubmitTo }>
                                    <div className="form-group">
                                        <label>
                                            <input type="checkbox" name="itemPublishedTo" id="#item-published-to"
                                                   value={ this.data.item && this.data.item.published }/>
                                            Published?
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemTitleTo">Item Title</label>
                                        <input type="text" name="itemTitleTo" className="form-control" placeholder="Item Title" tabIndex="3"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemContentTo">Item Content</label>
                                        <textarea name="itemContentTo" className="form-control" placeholder="Item Content" tabIndex="4"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-success" value="Save translation" tabIndex="6"/>
                                    </div>
                                </Form>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        );
    }
});