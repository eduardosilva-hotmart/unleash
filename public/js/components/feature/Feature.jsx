var React = require('react');
var FeatureForm = require('./FeatureForm');
var LogEntryList = require('../log/LogEntryList');
var eventStore = require('../../stores/EventStore');



var Feature = React.createClass({
    getInitialState: function() {
        return {
            editMode: false,
            showHistory: false,
            events: []
        };
    },

    handleEventsResponse: function(response) {
      this.setState({events: response});
    },

    toggleHistory: function() {
        eventStore.getEventsByName(this.props.feature.name).then(this.handleEventsResponse);
        this.setState({showHistory: !this.state.showHistory});
    },


    toggleEditMode: function() {
        this.setState({editMode: !this.state.editMode});
    },

    saveFeature: function(feature) {
        this.props.onChange(feature);
        this.toggleEditMode();
    },


    renderEditMode: function() {
        return (
            <tr>
                <td colSpan="5" className="pan man no-border">
                    <FeatureForm feature={this.props.feature} onSubmit={this.saveFeature} onCancel={this.toggleEditMode} />
                </td>
            </tr>
            );

    },

    render: function() {
        return (
            <tbody>
                <tr className={this.state.editMode ? "edit bg-lilac-xlt" : ""}>
                    <td width="20">
                        <span className={this.props.feature.enabled ? "toggle-active" : "toggle-inactive"} title="Status">
                        </span>
                    </td>
                    <td>
                        {this.props.feature.name}
                    </td>

                    <td className='opaque smalltext word-break' width="600">
                        {this.props.feature.description || '\u00a0'}
                    </td>

                    <td>
                        {this.props.feature.strategy}
                    </td>

                    <td width="100">
                        <div className="line">
                            <div className="unit size1of2">
                                <button className={this.state.editMode ? "primary" : ""} title='Edit' onClick={this.toggleEditMode}>
                                    <span className="icon-redigere" />
                                </button>
                            </div>
                            <div className="unit size1of2">
                                <button className={this.state.showHistory ? "primary" : ""} title='History' onClick={this.toggleHistory}>
                                    <span className="icon-visning_liste" />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
                {this.state.editMode ? this.renderEditMode() : this.renderEmptyRow()}
                {this.state.showHistory ? this.renderHistory() : this.renderEmptyRow()}
            </tbody>
        );
    },

    renderEmptyRow: function() {
        return (<tr />);
    },

    renderHistory: function() {
        return (<tr>
                    <td colSpan="5" className="no-border">
                        <LogEntryList events={this.state.events} />
                    </td>
                </tr>);
    }

});

module.exports = Feature;