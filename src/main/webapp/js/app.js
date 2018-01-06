var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var Item = React.createClass({
  render: function() {
    var item = this.props.item
    console.log("MAM TAKIEGO ITEMA "+item)
    return (
      <div className="col-md-3">
      <h3>{item.name}</h3>
      {item.description}<br/>
      price: {item.price}<br/>
      <button className="btn btn-default">Add to cart</button>
      </div>
    );
  }
});

var Catalog = React.createClass({
  render: function() {
    return (
      <div className="container">
        {
          this.state.items.map(function(e) {
            return (
              <Item key={e.name} item={e}/>
            );
          })
        }
      </div>
    )
  },

  getInitialState:	function()	{
    return	{
        items:	[]
    };
  },


    componentDidMount: function() {
    console.log("MONTUJE?");
       fetch('http://petstore-service-petstore.192.168.42.229.nip.io/pet', {method: 'get'})
       .then(
            d => {
                console.log(d)
                return d.json();

        })
       .then(d => {
           console.log("USTAWIAM STAN")
           console.log(d)
           this.setState({items: d})
           console.log(this.state.items)
           console.log("USTAWILEM STAN")

       })
       .catch(function(err) {
            console.log("PIES")
           console.log(err.stack)
       });
    }
});

var Cart = React.createClass({
    render: function() {
        return (
            <div id = "header" className = "row" >
            <h1>CART</h1>
            </div>
        );
    }
});

var GuestHeader = React.createClass({
  onClick: function() {
    console.log("BEDZIE TEN LOGIN?");
    keycloak.login();
    return false;
  },
   render: function() {
      console.log("RENDERUJE GESTA");
      return(
       <li><a href="#" onClick={this.onClick}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
      );
    }
  });

var UserHeader = React.createClass({
   render: function() {
      return(
      <div>
      <li><a href="/account"><span className="glyphicon glyphicon-shopping-cart"></span> Login</a></li>
      <li><a href="/cart"><span className="glyphicon glyphicon-shopping-cart"></span> Login</a></li>;
      </div>
      );
    }
  });

var Header = React.createClass({

    render: function() {
        var rightHeader;
        if(keycloak && keycloak.authenticated){
            rightHeader = <UserHeader/>
        } else {
            rightHeader = <GuestHeader/>
        }
        return (
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <h1>Cloud petstore</h1>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                {rightHeader}
              </ul>
            </div>
          </nav>
        );
    }
});


var App = React.createClass({
    render: function() {
        return (
            <div>
              <Header/>
              <RouteHandler/>
            </div>
        )
    }
});

var routes = (
    <Route handler = {App} path = "/" >
    <DefaultRoute name = "catalog" handler = {Catalog} />
    <Route name = "cart" handler = {Cart}/>
    </Route >
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render( < Handler / > , document.getElementById('container'));
});