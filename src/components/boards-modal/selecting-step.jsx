import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import BoardTile from './board-tile.jsx';

import styles from './boards-modal.css';

const SelectingStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <div className={styles.boardTilePane}>
                {props.boardsList.map(board =>
                    (<BoardTile
                        iconURL={board.insetIconURL}
                        connectionIconURL={board.connectionIconURL}
                        key={board.extensionId}
                        name={board.name}
                        extensionId={board.extensionId}
                        onSelect={props.onSelect}
                    />)
                )}
            </div>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                <FormattedMessage
                    defaultMessage="Select your board in the list above."
                    id="gui.boardsModal.instructions"
                />
            </Box>
        </Box>
    </Box>
);

SelectingStep.propTypes = {
    onSelect: PropTypes.func,
    boardsList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        extensionId: PropTypes.string
    }))
};

SelectingStep.defaultProps = {
    boardsList: []
};

export default SelectingStep;
