import React from "react"
import { AppDrawer } from "../../components"
import { Container, Grid, GridList, makeStyles, ButtonGroup, Button } from "@material-ui/core"
import { ProductItem } from "../../components/productItem/ProductItem"
import { Product } from "../../../domain"
import { useSelector, useDispatch } from "react-redux"
import { ProductSagaActions } from "../../../actions/sagas/products"
import { IRootState, IProductStoreState } from "../../../stores"

const useStyles = makeStyles({
    actionBar: {
        padding: 8
    },
    listContainer: {
        padding: 15
    },
    gridList: {
        justifyContent: "center"
    }
})

interface IDashboardProps { }
const itemsPerPage = 20
const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {
    const styles = useStyles();
    const [page, setPage] = React.useState(0)
    const productStore = useSelector<IRootState>(s => s.product) as IProductStoreState
    const dispatch = useDispatch()

    React.useEffect(() => {
        const loadData = () => dispatch({
            type: ProductSagaActions.GetAll,
            pagination: {
                skip: page * itemsPerPage,
                take: itemsPerPage
            }
        })

        loadData()
    }, [page, dispatch])

    const getPreviousPage = () => setPage(page => page - 1 < 0 ? 0 : page - 1)

    const getNextPage = () => setPage(page => {
        const totalPages = Math.floor(productStore?.total / itemsPerPage)
        const nextPage = page + 1
        return nextPage > totalPages ? totalPages : nextPage
    })

    const renderItem = (item: Product) => {
        return (
            <ProductItem
                key={item.id}
                product={item}
            />
        )
    }

    return (
        <AppDrawer>
            <Container
                maxWidth="xl"
            >
                <Grid
                    className={styles.listContainer}
                    container
                    alignContent="center"
                    alignItems="center"
                    direction="column"
                >
                    <GridList
                        cellHeight={340}
                        cols={4}
                        className={styles.gridList}
                    >
                        {
                            productStore?.products?.map(renderItem)
                        }
                    </GridList>
                    <ButtonGroup className={styles.actionBar}>
                        <Button onClick={getPreviousPage}> Previous </Button>
                        <Button> {page} </Button>
                        <Button onClick={getNextPage}> Next </Button>
                    </ButtonGroup>

                </Grid>
            </Container>
        </AppDrawer>
    )
}

export default Dashboard