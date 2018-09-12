const { PropTypes } = React;

const env = process.env.NODE_ENV;
console.log('process.env.NODE_ENV: ', env);

const ListItem = ({ data }) => {
  return <li>{data}</li>
};

if (env === 'development') {
  ListItem.propTypes = {
    data: PropTypes.string
  };
}


const List = ({ children }) => {
  return <ul>{children}</ul>
};

if (env === 'development') {
  List.propTypes = {
    children: PropTypes.element
  };
}

const App = ({ girlList = [] }) => {
  return <List>
    {
      girlList.map((girl, idx) => {
        return <ListItem key={idx} data={girl} />
      })
    }
  </List>
};

if (env === 'development') {
  App.propTypes = {
    girlList: PropTypes.arrayOf(PropTypes.string)
  };
}

ReactDOM.render(
  <App girlList={['熊黛林', '王菲']} />,
  document.getElementById('app')
);

