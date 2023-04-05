import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AboutModalComponent from '../components/about-modal/about-modal.jsx';
import {closeAboutModal} from '../reducers/modals.js';

const AboutModal = ({
    isRtl,
    onCloseAboutModal
}) => (
    <AboutModalComponent
        isRtl={isRtl}
        onCancel={onCloseAboutModal}
    />
);

AboutModal.propTypes = {
    onCloseAboutModal: PropTypes.func,
    isRtl: PropTypes.bool
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onCloseAboutModal: () => dispatch(closeAboutModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutModal);
