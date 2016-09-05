
import React from 'react';
import {connect} from 'react-redux';
import FrontPage from '../pages/FrontPage';

class FrontPageContainer extends React.Component {
    render() {
        return (
            <FrontPage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { FrontPage } = state;
    return {
        FrontPage
    }
})(FrontPageContainer);
