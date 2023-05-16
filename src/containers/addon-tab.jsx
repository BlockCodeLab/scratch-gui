import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';

import AddonPenel from '../components/addon-panel/addon-panel.jsx';

class AddonTab extends React.Component {
    shouldComponentUpdate (nextProps) {
        return this.props.stageSize !== nextProps.stageSize;
    }
    componentDidUpdate () {
        if (this.props.didUpdate) {
            this.props.didUpdate();
        }
    }
    componentWillUnmount () {
        if (this.props.willUnmout) {
            this.props.willUnmout();
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            didMount,
            didUpdate,
            willUnmout,
            /* eslint-enable no-unused-vars */
            ...componentProps
        } = this.props;
        return (
            <AddonPenel
                containerRef={didMount}
                {...componentProps}
            />
        );
    }
}

AddonTab.propTypes = {
    isRtl: PropTypes.bool,
    didMount: PropTypes.func,
    didUpdate: PropTypes.func,
    willUnmout: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddonTab);
