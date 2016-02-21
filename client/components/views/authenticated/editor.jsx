Editor = React.createClass({
    propTypes: {
        itemId: React.PropTypes.string.isRequired,
        lang: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            langTo: 'sk' //todo: put user favorite lang
        };
    },
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let sub = Meteor.subscribe( 'item', this.props.itemId );

        return {
            item: Items.findOne( { _id: this.props.itemId } ),
            subReady: sub.ready()
        };
    },
    componentDidMount() {
        if ( this.data.subReady ){
            let titleTo = this.data.item.content[this.state.langTo] && this.data.item.content[this.state.langTo].title;
            let textTo = this.data.item.content[this.state.langTo] && this.data.item.content[this.state.langTo].text;
            this.setState({
                titleTo: titleTo,
                textTo: textTo
            });
        }


    },
    validationsFrom() {
        //todo: make editable only for the owner (or put some review process)
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
                        titleTo: component.state.titleTo,
                        textTo: component.state.textTo,
                        publishedTo: isChecked( form, '[name="itemPublishedTo"]' ),
                        //todo: [langTo] When we loose session we keep the good dropdown value BUT the session is reseted so EN everytime
                        langTo: component.state.langTo
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
    dropdownCallbackTo(value) {
        //console.log('Dropdown changed',value);
        this.setState({langTo: value}); //todo: understand why the setState function is so long that we need to use the variable value (it looks like it is just set at the end)
        let titleTo = this.data.item.content[value] && this.data.item.content[value].title,
            textTo = this.data.item.content[value] && this.data.item.content[value].text;
        this.setState({
            titleTo: titleTo,
            textTo: textTo
        });
    },
    handleChangeTitleTo(e){
        //console.log('Form element titleTo changed', e.target.value);
        this.setState({titleTo: e.target.value});
    },
    handleChangeTextTo(e){
        //console.log('Form element textTo changed', e.target.value);
        this.setState({textTo: e.target.value});
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
        let langTo = 'sk'; //todo: put user favorite lang --> different then the State because it will not get rerendered at every change and will not cause an Invariant Violation
        var boundClickTo = this.dropdownCallbackTo.bind(this);

        return (
            <div>
                <p className="updated-date">
                    <strong>Last Updated:</strong> { this.getLastUpdate() }
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
                                {
                                    //<Dropdown lang={langFrom} src="From"/>
                                }
                                <Form ref="editItemFormFrom" id="editItemFormFrom" className="editItemFormFrom" validations={ this.validationsFrom() } onSubmit={ this.handleSubmitFrom }>
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
                                <Dropdown lang={langTo} src="To" callback={boundClickTo}/>
                                <Form ref="editItemFormTo" id="editItemFormTo" className="editItemFormTo" validations={ this.validationsTo() } onSubmit={ this.handleSubmitTo }>
                                    <div className="form-group">
                                        <label>
                                            <input type="checkbox" name="itemPublishedTo" id="#item-published-to"
                                                   value={ this.data.item.content[this.state.langTo] && this.data.item.content[this.state.langTo].published }
                                                   onChange={this.handleChange}/>
                                            Published?
                                        </label>
                                    </div>
                                    <FormGroup>
                                        <FormElement //todo: add placeholder and tabIndex
                                            showLabel={ true }
                                            style="input"
                                            type="text"
                                            name="itemTitleTo"
                                            label="Item Title"
                                            onChange={ this.handleChangeTitleTo }
                                            value={this.state.titleTo}
                                            //defaultValue={ this.data.item.content[this.state.langTo] && this.data.item.content[this.state.langTo].title }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormElement //todo: add placeholder and tabIndex
                                            showLabel={ true }
                                            style="input"
                                            type="text"
                                            name="itemContentTo"
                                            label="Item Content"
                                            onChange={ this.handleChangeTextTo }
                                            value={this.state.textTo}
                                        />
                                    </FormGroup>
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