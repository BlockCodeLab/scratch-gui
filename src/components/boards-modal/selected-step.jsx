import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './boards-modal.css';

const SelectedStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <div className={styles.boardActivity}>
                    <img
                        className={styles.boardActivityIcon}
                        src={props.boardIconURL}
                    />
                </div>
            </Box>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                <FormattedMessage
                    defaultMessage="Selected"
                    id="gui.boardsModal.selected"
                />
            </Box>
            <div className={classNames(styles.bottomAreaItem, styles.cornerButtons)}>
                <button
                    className={classNames(styles.redButton, styles.selectButton)}
                    onClick={props.onReselect}
                >
                    <FormattedMessage
                        defaultMessage="Reselect"
                        id="gui.boardsModal.reselect"
                    />
                </button>
                <button
                    className={styles.selectButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Go to Editor"
                        id="gui.connection.go-to-editor"
                    />
                </button>
            </div>
        </Box>
    </Box>
);

SelectedStep.propTypes = {
    boardIconURL: PropTypes.string,
    onCancel: PropTypes.func,
    onReselect: PropTypes.func
};

export default SelectedStep;
