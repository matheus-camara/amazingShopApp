import React from 'react'
import { Appbar } from '../../components'
import { Container, Grid } from '@material-ui/core';
import { ProductItem } from '../../components/productItem/ProductItem'
import { Product } from '../../../domain'
import { useSelector, useDispatch } from "react-redux"
import { ProductSagaActions } from '../../../actions/sagas/products'
import { IRootState, IProductStoreState } from '../../../stores';

interface IDashboardProps {

}

const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {

    const [page, setPage] = React.useState(0)
    const dispatch = useDispatch()
    const productStore = useSelector<IRootState>(s => s.product) as IProductStoreState
    const itemsPerPage = 20;

    React.useEffect(() => {     
        dispatch({
            type: ProductSagaActions.GetAll,
            pagination: {
                skip: page * itemsPerPage,
                take: itemsPerPage
            }
        })
    }, [page])

    const renderItem = (item: Product) => {
        return (
            <ProductItem
                key={item.id}
                product={item}
            />
        )
    }

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
                        productStore.products.map(renderItem)
                    }
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;