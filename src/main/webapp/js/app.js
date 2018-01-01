var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var Catalog = React.createClass({
    render: function() {
        return (
            <div id = "header" className = "row" >
            <h1>STORE</h1>
            </div>
        );
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

var Header = React.createClass({
    render: function() {
        return (
            <div id = "header" nclassName = "row" >
                <h1>SWARM PETSTORE</h1>
                <ul className = "inline-list" >
                    <li> <Link to = "catalog" > Catalog < /Link></li>
                    <li> <Link to = "cart" > Cart < /Link></li>
                </ul>
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