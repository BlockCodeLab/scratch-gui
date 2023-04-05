import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './sponsor-tooltip.css';

import wechatImage from './qr--wechat.jpg';
import coffeeImage from './qr--coffee.jpg';

class SponsorContent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setHide',
            'setShow',
            'getSponsorImage'
        ]);
        this.state = {
            isShowing: false
        };
    }
    setShow () {
        // needed to set the opacity to 1, since the default is .9 on show
        this.setState({isShowing: true});
    }
    setHide () {
        this.setState({isShowing: false});
    }
    getSponsorImage () {
        const isChinese = this.props.intl.locale === 'zh-cn';
        return (
            <img
                className={styles.sponsorImage}
                src={isChinese ? wechatImage : coffeeImage}
            />
        );
    }
    render () {
        return (
            <ReactTooltip
                afterHide={this.setHide}
                afterShow={this.setShow}
                className={classNames(
                    styles.sponsor,
                    this.props.className,
                    {
                        [styles.show]: (this.state.isShowing),
                        [styles.left]: (this.props.place === 'left'),
                        [styles.right]: (this.props.place === 'right'),
                        [styles.top]: (this.props.place === 'top'),
                        [styles.bottom]: (this.props.place === 'bottom')
                    }
                )}
                getContent={this.getSponsorImage}
                id={this.props.tooltipId}
            />
        );
    }
}

SponsorContent.propTypes = {
    className: PropTypes.string,
    intl: intlShape,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipId: PropTypes.string.isRequired
};

SponsorContent.defaultProps = {
    place: 'bottom'
};

const Sponsor = injectIntl(SponsorContent);

const SponsorTooltip = props => (
    <div className={props.className}>
        <div
            data-delay-hide={props.delayHide}
            data-delay-show={props.delayShow}
            data-effect="solid"
            data-for={props.tooltipId}
            data-place={props.place}
            data-tip="tooltip"
        >
            {props.children}
        </div>
        <Sponsor
            className={props.tooltipClassName}
            place={props.place}
            tooltipId={props.tooltipId}
        />
    </div>
);

SponsorTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delayHide: PropTypes.number,
    delayShow: PropTypes.number,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipClassName: PropTypes.string,
    tooltipId: PropTypes.string.isRequired
};

SponsorTooltip.defaultProps = {
    delayHide: 0,
    delayShow: 0
};

export {
    Sponsor as SponsorComponent,
    SponsorTooltip
};
