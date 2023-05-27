import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import SelectingStep from './selecting-step.jsx';
import SelectedStep from './selected-step.jsx';

import styles from './boards-modal.css';

const PHASES = keyMirror({
    selecting: null,
    selected: null
});

const BoardsModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.name}
        headerClassName={styles.header}
        id="boardsModal"
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {props.phase === PHASES.selecting && <SelectingStep {...props} />}
            {props.phase === PHASES.selected && <SelectedStep {...props} />}
        </Box>
    </Modal>
);

BoardsModalComponent.propTypes = {
    boardsList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        extensionId: PropTypes.string
    })),
    name: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    phase: PropTypes.oneOf(Object.keys(PHASES)).isRequired
};

export {
    BoardsModalComponent as default,
    PHASES
};
