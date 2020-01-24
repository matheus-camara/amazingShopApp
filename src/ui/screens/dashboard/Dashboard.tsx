import React from 'react';
import { Appbar } from '../../components';
import { Container, Grid } from '@material-ui/core';
import { ProductItem } from '../../components/productItem/ProductItem';
import { Product } from '../../../domain';
import { useProductStore, ProductActions } from '../../../stores/';

interface IDashboardProps {

}

const Dashboard: React.FC<IDashboardProps> = (props) => {

    const [productStore, productDispatch] = useProductStore()
    React.useEffect(() => {
        const getProducts = async () => await productDispatch({ type: ProductActions.GetAll })
        getProducts()
    }, [])

    const renderItems = (items: Product[]) => items?.map(
        (p, i) =>
            <Grid item >
                <ProductItem
                    product={p}
                    key={i}
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
                        renderItems(productStore.products)
                    }
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;