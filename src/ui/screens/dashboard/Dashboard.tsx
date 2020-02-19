import React from 'react'
import { Appbar } from '../../components'
import { Container, Grid } from '@material-ui/core';
import { ProductItem } from '../../components/productItem/ProductItem'
import { useProductStore } from '../../../stores/'

interface IDashboardProps {

}

const Dashboard: React.FC<IDashboardProps> = (props) => {

    const [productStore, dispatch] = useProductStore()
    const [page, setPage] = React.useState(0);
    const itemsPerPage = 20;
    let index = 0;

    React.useEffect(() => {
    }, [page])

    const renderItem = ({ columnIndex, rowIndex }: { columnIndex: number, rowIndex: number }) => {

        const item = productStore.products[index];

        return !!item ? (
            <ProductItem
                key={index - 1}
                product={item}
            >
            </ProductItem>
        ) : null
    }

    // const renderItems = () => {
    //     return (
    //         <InfiniteLoader
    //             itemCount={productStore.total}
    //             isItemLoaded={(index: number) => index <= productStore.products.length}
    //             loadMoreItems={(start: number, stop: number) => {
    //                 setPage(Math.abs(start / itemsPerPage))
    //                 return null
    //             }}>
    //             {
    //                 ({ onItemsRendered, ref }) =>
    //                     <FixedSizeGrid
    //                         columnCount={1000}
    //                         columnWidth={100}
    //                         height={150}
    //                         rowCount={1000}
    //                         rowHeight={35}
    //                         width={300}
    //                     >
    //                         {renderItem}
    //                     </FixedSizeGrid>
    //             }
    //         </InfiniteLoader>)
    // }

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
                    }
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;