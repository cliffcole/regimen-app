import React, {Component} from 'react';
import SideDrawer from './SideDrawer/SideDrawer';
import './Dashboard.css';
import FancyButton from './FancyButton/FancyButton';
import Aux from '../../hoc/Aux/Aux';
//import ProductItem from '../ProductEntry/ProductItem';
import axios from 'axios';
import Products from './../Products/Products'
import ProductForm from './ProductForm/ProductForm'
import {Link} from 'react-router-dom';
import { Route,Switch } from 'react-router-dom';
import ProductFormEdit from './ProductFormEdit/ProductFormEdit'

class Dashboard extends Component {
    state = {
        token: null,
        modalOpen: false,
        userData: null
    }
    
    componentWillMount() {
        //console.log(this.props);
        let token = this.props.location.token;
        this.setState(
            {
                userData: this.props.location.userData,
                token: token
            }
        );
    }

    componentDidMount() {
        this.getProductsByUserId();
    }

    getProductsByUserId() {
        let userData = this.state.userData;
        if(typeof userData !== 'undefined'){
            axios({
                method: "GET",
                url: "/product/" + this.state.userData.id
            }).then(results => {
                console.log(results.data);
                let products = results.data
                let newUserData = this.state.userData;
                newUserData['products'] = products;
                console.log("newUserData");
                console.log(newUserData);
                this.setState({userData: newUserData});
                
            })
        }
    }
    
    

    onOpenModal = () => {
        console.log("onOpenModal()")
        this.setState({ modalOpen: true });
    };
    
    onCloseModal = () => {
        console.log("onCloseModal()")
        this.setState({ modalOpen: false });
    };

    handleProductAdd = (event,props) => {
        console.log("GOT TO PRODUCT ADD");
        event.preventDefault()
        console.log(event.target);
        let name = event.target.productname.value;
        let price = event.target.price.value;
        let purchaseurl = event.target.purchaseurl.value;
        let promocode = event.target.promocode.value;
        let description = event.target.description.value;
        let userId = this.state.userData.id;
        let url = event.target.imgurl.value
        axios({
            method: "POST",
            url: "/product/add",
            data: {
                name: name,
                price: price,
                purchaseurl: purchaseurl,
                url: url,
                promocode: promocode,
                description: description,
                UserId: userId
                
            }
        }).then(results => {
            console.log(results.data);
            console.log("ADD PROPS");
            console.log(props);
            this.getProductsByUserId(userId);
            props.history.push({
                pathname: '/Dashboard',
                token: props.location.token,
                userData: this.state.userData
            }
            );
        }) 

    }

    handleProductEdit = (event,props) => {
        event.preventDefault();
        console.log("Edit PROPS");
        
        let name = event.target.productname.value;
        let price = event.target.price.value;
        let purchaseurl = event.target.purchaseurl.value;
        let promocode = event.target.promocode.value;
        let description = event.target.description.value;
        let productId = event.target.productid.value;
        let userId = this.state.userData.id;
        let url = event.target.imgurl.value;

        console.log(name,price,purchaseurl,promocode,description,productId,userId)
        axios({
            method: "PUT",
            url: "/product/edit",
            data: {
                name: name,
                id: productId,
                url: url,
                price: price,
                purchaseurl: purchaseurl,
                promocode: promocode,
                description: description,
                UserId: userId
            }
        }).then(results => {
            console.log(results.data);
            
            console.log(props);
            this.getProductsByUserId(userId);
            props.history.push({
                pathname: '/Dashboard',
                token: props.location.token,
                userData: this.state.userData
            }
            );
        }) 
    }

    handleProductDelete = (id) => {
        
        console.log("Product ID: "+id +" userId: "+ this.state.userData.id);
        axios({
            method: "DELETE",
            url: "/product/delete",
            data: {
                productId: id,
                userId: this.state.userData.id
            }
        }).then(results => {
            console.log(results);
            this.getProductsByUserId(this.state.userData.id);
        })
    }
    
    render() {

        let jsxHtml = "";
        
        if(this.props.location.token){ 
            jsxHtml = (
            <Aux>
                <SideDrawer 
                    test="test"
                />
                
                    <div className="container-fluid" id="DashContent">
                        <div className="row">
                            <div className="DashGreeting">
                                <h2 className="DashTitle">Hello, {this.state.userData.firstname}</h2>
                                <FancyButton
                                handleProductAdd={this.handleProductAdd}
                                modalOpen={this.state.modalOpen}
                                onCloseModal={this.onCloseModal}
                                onOpenModal={this.onOpenModal}
                                state={this.state}
                                /> 
                            </div>
                    </div>
                </div>
                <Switch>
                <Route 
                    path={`${this.props.match.url}/product/add`} 
                    component={ProductForm} 
                />
                <Route 
                    path={`${this.props.match.url}/product/edit`} 
                    component={ProductFormEdit} 
                />
                <Route 
                    path={`${this.props.match.url}`}
                    render={() => {
                        return (<Products 
                            products={this.state.userData.products}
                            handleProductDelete={this.handleProductDelete}
                            handleProductEdit={this.handleProductEdit}
                            modalOpen={this.state.modalOpen}
                            onCloseModal={this.onCloseModal}
                            onOpenModal={this.onOpenModal}
                            state={this.state}
                        />)
                    }} 
                />
                </Switch>
            </Aux>
            );
        }else {
            this.props.history.push({
                pathname: '/login'
            })
        }
        return(
            <div>
            {jsxHtml}
            </div>
        )
    }
}

export default Dashboard;