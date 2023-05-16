import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './addon-panel.css';

const AddonPanel = ({
    containerRef
}) => (
    <Box className={styles.wrapper}>
        <Box
            componentRef={containerRef}
            className={styles.container}
        />
    </Box>
);

AddonPanel.propTypes = {
    containerRef: PropTypes.func
};

export default AddonPanel;
