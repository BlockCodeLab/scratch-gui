import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import {connect} from 'react-redux';
import BoardsModalComponent, {PHASES} from '../components/boards-modal/boards-modal.jsx';
import {setBoardsModalBoardId} from '../reducers/boards-modal';
import {closeBoardsModal} from '../reducers/modals';

class BoardsModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleSelect',
            'handleReselect'
        ]);
        this.state = {
            extension: null,
            boardsList: [],
            phase: props.boardId ? PHASES.selected : PHASES.selecting,
            boardIconURL: null
        };
    }
    componentDidMount () {
        this.props.vm.extensionManager.fetchExtensionData(extensionData => {
            const boardExtension = extensionData.find(ext => ext.extensionId === this.props.boardId);
            this.setState({
                extension: extensionData.find(ext => ext.extensionId === this.props.extensionId),
                boardsList: this.props.boardsList.map(id => extensionData.find(ext => ext.extensionId === id)),
                boardIconURL: boardExtension && boardExtension.connectionIconURL
            });
        });
    }
    handleCancel () {
        // Close the modal.
        this.props.onCancel();
    }
    handleSelect (boardId) {
        this.props.vm.runtime.emit('SELECT_BOARD', this.props.extensionId, boardId);
        this.props.onSelect(boardId);
        this.setState({
            phase: PHASES.selected
        });
        this.props.onCancel();
    }
    handleReselect () {
        this.props.onSelect(null);
        this.setState({
            phase: PHASES.selecting
        });
    }
    render () {
        return (
            <BoardsModalComponent
                name={this.state.extension ? this.state.extension.name : ''}
                boardIconURL={this.state.boardIconURL}
                boardsList={this.state.boardsList}
                onCancel={this.handleCancel}
                onSelect={this.handleSelect}
                onReselect={this.handleReselect}
                phase={this.state.phase}
            />
        );
    }
}

BoardsModal.propTypes = {
    boardId: PropTypes.string,
    boardsList: PropTypes.arrayOf(PropTypes.string).isRequired,
    extensionId: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

BoardsModal.defaultProps = {
    boardsList: []
};

const mapStateToProps = state => ({
    boardId: state.scratchGui.boardsModal.boardId,
    boardsList: state.scratchGui.boardsModal.boardsList,
    extensionId: state.scratchGui.boardsModal.extensionId
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => {
        dispatch(closeBoardsModal());
    },
    onSelect: boardId => {
        dispatch(setBoardsModalBoardId(boardId));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardsModal);
