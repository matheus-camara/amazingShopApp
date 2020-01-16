import React from 'react';
import { Appbar } from '../../components';
import { Container, Grid } from '@material-ui/core';
import { ProductItem } from '../../components/productItem/ProductItem';
import { Product } from '../../../domain';

interface IDashboardProps {

}

const mock = new Product({
    id: 0,
    name: "Shirt",
    description: "A white Shirt",
    imageUrl: "https://decathlonpro.vteximg.com.br/arquivos/ids/408259-500-500/ekiden-ts-white-2015-2xl1.jpg?v=636555837796230000",
    price: 29.99
});

const Dashboard: React.FC<IDashboardProps> = (props) => {

    const [products, setProducts] = React.useState([mock, mock, mock, mock, mock, mock]);

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
                        renderItems(products)
                    }
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;