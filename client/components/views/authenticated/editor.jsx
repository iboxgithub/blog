Editor = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        Meteor.subscribe( 'item', this.props.item );

        return {
            item: Items.findOne( { _id: this.props.item } )
        };
    },
    validations() {
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

                let form = component.refs.editItemForm.refs.form,
                    item = {
                        _id: component.props.item,
                        title: getValue( form, '[name="itemTitleTo"]' ),
                        text: getValue( form, '[name="itemContentTo"]' ),
                        published: isChecked( form, '[name="itemPublishedTo"]' ),
                        lang: Session.get('dropdownTo')
                        //lang: getValue( form, '[id="dLabelto"]' )
                    };

                Meteor.call( 'saveItem', item, ( error, response ) => {
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
        console.log('Letting this error to come back on the ReactDOM form link later');
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
                    /*let component = this;
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
                    });*/
                }
            }//}

        );
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
    handleSubmit( event ) {
        event.preventDefault();
        /*console.log('submitted2');
        let component = this;
        let { getValue, isChecked } = ReactHelpers;

        //todo: check if working
        let form = component.refs.editItemForm.refs.form,
            item = {
                _id: component.props.item,
                title: getValue( form, '[name="itemTitle"]' )
            };

        Meteor.call( 'saveItem', item, ( error, response ) => {
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                Bert.alert( 'Item saved!', 'success' );
            }
        });*/

    },
    render() {
        if ( !this.data.item ) { return <div/>; }
//<form ref="editItemForm" id="editItemForm" className="editItemForm" onSubmit={this.handleSubmit}>


        return (
            <Form ref="editItemForm" id="editItemForm" className="editItemForm" validations={ this.validations() } onSubmit={ this.handleSubmit }>
                <p className="updated-date">
                    <strong>Last Updated:</strong> { this.getLastUpdate() }
                </p>

                <table>
                    <thead>
                        <tr>
                            <td>
                                <Dropdown lang="FR" id="From"/>
                            </td>
                            <td>
                                <Dropdown lang="EN" id="To"/>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
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
                            </td>
                            <td>
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
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="form-group">
                    <input type="submit" className="btn btn-success" value="Save item" tabIndex="6"/>
                </div>
            </Form>
        );
    }
});