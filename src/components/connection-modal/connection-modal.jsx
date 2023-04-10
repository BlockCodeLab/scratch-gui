import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './connection-modal.css';

const PHASES = keyMirror({
    scanning: null,
    connecting: null,
    connected: null,
    error: null,
    unavailable: null
});

const ConnectionModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel=""
        headerClassName={styles.header}
        id="connectionModal"
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.activityArea}>
                <div className={styles.activityAreaInfo}>
                    <div className={styles.centeredRow}>
                        <React.Fragment>
                            <img
                                className={styles.connectionTipIcon}
                                src={props.connectionTipIconURL}
                            />
                        </React.Fragment>
                    </div>
                </div>
            </Box>
        </Box>
    </Modal>
);

ConnectionModalComponent.propTypes = {
    connectionTipIconURL: PropTypes.string,
    onCancel: PropTypes.func.isRequired
};

export {
    ConnectionModalComponent as default,
    PHASES
};
