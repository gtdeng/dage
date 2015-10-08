import React       from 'react';
import { connect } from 'react-redux';
import FlaggedEmailList from 'components/FlaggedEmailList';
import Header from 'components/Header';
import SideNav from 'components/SideNav';
import Footer from 'components/Footer';
import ScriptLoader from 'components/ScriptLoader';
import FilterList from 'components/FilterList';
import FlagList from 'components/FlagList';

import {
  emailArrayFetch,
  emailArrayFetchSuccess,
  emailArrayFetchError,
  emailShowOneFlag,
  emailShowAllFlags,
  emailShowComplete,
} from 'actions/emails';

import {
  filterArrayFetch,
} from 'actions/filters';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  emails : state.emails,
  filters : state.filters,
});
export class MainView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    emails : React.PropTypes.object,
    filters : React.PropTypes.object,
  }

  constructor() {
    super();
    this.callbacks = {
      _emailArrayFetch : param => {
        this.props.dispatch(emailArrayFetch(param))
      },
      _emailArrayFetchSuccess : param => {
        this.props.dispatch(emailArrayFetchSuccess(param))
      },
      _emailArrayFetchError : param => {
        this.props.dispatch(emailArrayFetchError(param))
      },
      _emailShowOneFlag : emailId => {
        this.props.dispatch(emailShowOneFlag(emailId));
      },
      _emailShowAllFlags : emailId => {
        this.props.dispatch(emailShowAllFlags(emailId));
      },
      _emailShowComplete : emailId => {
        this.props.dispatch(emailShowComplete(emailId));
      },
    }
  }

  componentDidMount () {
    this.props.dispatch(emailArrayFetch())
    this.props.dispatch(filterArrayFetch())
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!

  flaggedEmailsViewRender () {
    return (
      <div className='container text-center'>
        <h1>Dage Flagged Emails</h1>
        <FlaggedEmailList
          state={ this.props.emails }
          callbacks={ this.callbacks }
        />
      </div>
    );
  }
  customizeFiltersViewRender () {
    return (
      <div className='container text-center'>
        <h1>Dage Customize Filters</h1>
        <FilterList
          options={ this.props.filters.filterOptions }
          callbacks={ this.callbacks }
        />
        <FlagList
          state={ this.props.filters }
          callbacks={ this.callbacks }
        />
      </div>
    );
  }


  render() {
    let callbacks = {};
    return (
      <div>
        <Header />
        { this.flaggedEmailsViewRender() }
        { this.customizeFiltersViewRender() }
        <SideNav />
        <Footer />
        <ScriptLoader />

                                                                                                                                                                                                                                                                <div className='page-overlay'></div>
        <div
          state={ this.props.state }
          callbacks={ callbacks }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainView);
