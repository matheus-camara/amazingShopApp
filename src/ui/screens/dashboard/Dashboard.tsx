import React from 'react';
import { Appbar } from '../../components';
import { Container, Grid } from '@material-ui/core';
import { ProductItem } from '../../components/productItem/ProductItem';
import { Product } from '../../../domain';
import { productsReducerInitialState, productsReducer } from '../../../reducers/products/productsReducer';

interface IDashboardProps {

}

const Dashboard: React.FC<IDashboardProps> = (props) => {

    const [state, dispatch] = React.useReducer(productsReducer, productsReducerInitialState);

    const renderItems = (items: Product[])=> items?.map(
        p => 
        <Grid item >
            <ProductItem
                product={p}
            />
        </Grid>);

    return (
        <>
            <Appbar />
            <Container
                maxWidth="xl"
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {
                        renderItems(state.products)
                    }
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;