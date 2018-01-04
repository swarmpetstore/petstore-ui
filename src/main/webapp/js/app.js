var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var Item = React.createClass({
  render: function() {
    var item = this.props.item
    return (
      <div className="pet">
      <h3>{item.name}</h3>
      {item.description}<br/>
      price: {item.price}<br/>
      <button>Add to cart</button>
      </div>
    );
  }
});

var Catalog = React.createClass({
  render: function() {
    console.log("RENDER CHOCIAZ :(")
    console.log(this.state.items)
    this.state.items.map(function(e){
        console.log(e.name);
    })
    return (
      <div>
        <h1>Pets</h1>
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

var Logger = React.createClass({
  onClick: function() {
    console.log("bede logowal");
    keycloak.login();
  },
  render: function() {
    return (
      <a href="" onClick={this.onClick}>Login</a>
    )
  }
});

var Header = React.createClass({
    render: function() {
        return (
            <div id = "header" nclassName = "row" >
                <h1>SWARM PETSTORE</h1>
                <ul className = "inline-list" >
                    <li> <Link to = "catalog" > Catalog < /Link></li>
                    <li> <Link to = "cart" > Cart < /Link></li>
                </ul>
                <Logger/>
            </div >
        );
    }
});

var Footer = React.createClass({
    render: function() {
        return (
            <div id = "header" className = "row" >
            <h1>FOOTER</h1>
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
            < Header / >
            <RouteHandler / >
            <Footer / >
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