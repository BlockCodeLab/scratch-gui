import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import SponsorButton from './sponsor-button.jsx';
import {version} from '../../../package.json';
import {version as productVersion} from '../../../product.json';

import logoImage from './blockcode-logo.png';

import styles from './about-modal.css';

const AboutModalComponent = props => (
    <Modal
        className={styles.content}
        headerClassName={styles.header}
        id="aboutModal"
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <div className={styles.headImage}>
                <img src={logoImage} />
            </div>
            <div className={styles.centeredRow}>
                <span className={styles.versionLabel}>
                    <FormattedMessage
                        defaultMessage="Scratch version: "
                        id="gui.aboutModal.coreVersion"
                    />
                </span>
                <span className={styles.versionInfo}>{version}</span>
            </div>
            <div className={styles.centeredRow}>
                <span className={styles.versionLabel}>
                    <FormattedMessage
                        className={styles.versionLabel}
                        defaultMessage="Product version: "
                        id="gui.aboutModal.version"
                    />
                </span>
                <span className={styles.versionInfo}>{productVersion}</span>
            </div>
            <div className={styles.centeredRow}>
                <SponsorButton className={styles.button} />
            </div>
        </Box>
    </Modal>
);

AboutModalComponent.propTypes = {
    onCancel: PropTypes.func.isRequired
};

export default AboutModalComponent;
