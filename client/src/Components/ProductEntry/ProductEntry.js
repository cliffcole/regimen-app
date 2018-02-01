import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import thumbnail from '../Profiles/Profile/ProfileIcon/thumbnail.png';

const ProductEntry = () => {
    return (
        <Aux>
            <div className="row">
                <div className="col-sm-3" id="ProductImg">
                    <img src={thumbnail} alt="..." width="170px" class="rounded-circle" />
                </div>
                <div className="col-sm-9" id="ProductContent">
                    <h4 className="ProductName">Product Name</h4>
                    <p className="ProductSubtitle">Price // Purchase // Promocode</p>
                    <p className="ProductDescription">Product Description</p>
                </div>
            </div>
        </Aux>
    )
}

export default ProductEntry;