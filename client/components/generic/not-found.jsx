NotFound = React.createClass({
    render() {
        return <div>
            <strong>Error [404]</strong>: { FlowRouter.current().path } does not exist.
        </div>;
    }
});