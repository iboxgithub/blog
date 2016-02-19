Editor = React.createClass({
    propTypes: {
        itemId: React.PropTypes.string.isRequired,
        lang: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {testState: 'eee'};
    },
    componentDidMount() {
        this.setState({testState: 'ffff'});
    },
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        Meteor.subscribe( 'item', this.props.itemId );

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
    getLastUpdate() {
        if ( this.data ) {
            let { formatLastUpdate } = ReactHelpers,
                item                 = this.data.item;

            return `${ formatLastUpdate( item.updated ) } by ${ item.author }`;
        }
    },
    toto(tmp) {
        //console.log("hello " + tmp);
        //return 'toto gg ' + tmp;
        this.setState({testState: 'aaaa'});
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
        let langFrom = this.props.lang;
        let langTo = 'sk'; //todo: update with Translator best foreign lang
        var boundClick = this.toto.bind(this, 're');

        return (
            <div>
                <p className="updated-date">
                    <strong>Last Updated:</strong> { this.getLastUpdate() }
                    <strong>Check reactivity:</strong> { this.state.testState }
                </p>

                <table>
                    <thead>
                        <tr>
                            <td>
                                Item  to translate
                            </td>
                            <td>
                                Translation
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Dropdown lang={langFrom} src="From" fct={boundClick}/>
                                <Form tmp={this.state.testState} ref="editItemFormFrom" id="editItemFormFrom" className="editItemFormFrom" validations={ this.validationsFrom() } onSubmit={ this.handleSubmitFrom }>
                                    <div className="form-group">
                                        <label>
                                            <input type="checkbox" name="itemPublishedFrom" id="#item-published-from"
                                                   value={ this.data.item && this.data.item.content[langFrom].published }/>
                                            Published?
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemTitleFrom">Item Title</label>
                                        <input type="text" name="itemTitleFrom" className="form-control" placeholder="Item Title" tabIndex="1"
                                               defaultValue={ this.data.item && this.data.item.content[langFrom].title }/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemContentFrom">Item Content</label>
                                        <textarea name="itemContentFrom" className="form-control" placeholder="Item Content" tabIndex="2"
                                                  defaultValue={ this.data.item && this.data.item.content[langFrom].text }/>
                                    </div>
                                    { itemOwner ?
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-success" value="Save translation" tabIndex="6"/>
                                        </div> : ''
                                    }

                                </Form>
                            </td>
                            <td>
                                <Dropdown lang={langTo} src="To"/>
                                <Form ref="editItemFormTo" id="editItemFormTo" className="editItemFormTo" validations={ this.validationsTo() } onSubmit={ this.handleSubmitTo }>
                                    <div className="form-group">
                                        <label>
                                            <input type="checkbox" name="itemPublishedTo" id="#item-published-to"
                                                   value={ this.data.item.content[langTo] && this.data.item.content[langTo].published }/>
                                            Published?
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemTitleTo">Item Title</label>
                                        <input type="text" name="itemTitleTo" className="form-control" placeholder="Item Title" tabIndex="3"
                                               defaultValue={ this.data.item.content[langTo] && this.data.item.content[langTo].title }/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="itemContentTo">Item Content</label>
                                        <textarea name="itemContentTo" className="form-control" placeholder="Item Content" tabIndex="4"
                                              defaultValue={ this.data.item.content[langTo] && this.data.item.content[langTo].text }/>
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