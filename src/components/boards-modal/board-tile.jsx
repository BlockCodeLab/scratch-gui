import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';

import styles from './boards-modal.css';

class BoardTile extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect'
        ]);
    }
    handleSelect () {
        this.props.onSelect(this.props.extensionId);
    }
    render () {
        return (
            <Box className={styles.boardTile}>
                <Box className={styles.boardTileName}>
                    <img
                        className={styles.boardTileImage}
                        src={this.props.iconURL}
                    />
                    <Box className={styles.boardTileNameWrapper}>
                        <Box className={styles.boardTileNameLabel}>
                            <FormattedMessage
                                defaultMessage="Board name"
                                id="gui.boardsModal.boardNameLabel"
                            />
                        </Box>
                        <Box className={styles.boardTileNameText}>
                            {this.props.name}
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.boardTileWidgets}>
                    <button
                        onClick={this.handleSelect}
                    >
                        <FormattedMessage
                            defaultMessage="Select"
                            id="gui.boardsModal.select"
                        />
                    </button>
                </Box>
            </Box>
        );
    }
}

BoardTile.propTypes = {
    iconURL: PropTypes.string,
    name: PropTypes.string,
    onSelect: PropTypes.func,
    extensionId: PropTypes.string
};

export default BoardTile;
