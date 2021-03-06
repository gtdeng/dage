let React = require('react');
let FilterList = require('components/FilterList');
let DashboardView = require('views/DashboardView');
import Login from 'components/Login';

let MainContent = React.createClass({

  render: function() {
    return (
      <div className='page-wrapper'>
        <main className='page main-container'>
          <h1>This is a test</h1>
          <div className='row'>
            <div className='col-xs-4'>
              <Login />
            </div>
            <div className='col-xs-6'>
              <FilterList />
            </div>
          </div>
        </main>
      </div>
      );
  },
});

module.exports = MainContent;
