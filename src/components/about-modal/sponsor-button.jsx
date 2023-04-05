import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';
import {SponsorTooltip} from './sponsor-tooltip.jsx';

import coffeeIcon from './icon--coffee.svg';
import styles from './sponsor-button.css';

const SponsorButton = ({
    className
}) => (
    <SponsorTooltip
        place="bottom"
        tooltipId="sponsor-button"
    >
        <Button
            className={classNames(
                className,
                styles.sponsorButton
            )}
            iconClassName={styles.sponsorButtonIcon}
            iconSrc={coffeeIcon}
        >
            <FormattedMessage
                defaultMessage="Buy me a Coffee"
                description="Label for sponsor button"
                id="gui.aboutModal.sponsor"
            />
        </Button>
    </SponsorTooltip>
);

SponsorButton.propTypes = {
    className: PropTypes.string
};

export default SponsorButton;
