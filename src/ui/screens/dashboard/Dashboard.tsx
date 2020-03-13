import React from "react"
import { AppDrawer, ProductItem } from "../../components"
import { Container, Grid, GridList, makeStyles, ButtonGroup, Button } from "@material-ui/core"
import { Product } from "../../../domain"
import { useSelector, useDispatch } from "react-redux"
import { ProductSagaActions } from "../../../actions/sagas/products"
import { IRootState, IProductStoreState } from "../../../stores"
import { useStringLocalizer } from "../../../contexts"

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
export const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {
    const styles = useStyles();
    const [page, setPage] = React.useState(0)
    const productStore = useSelector<IRootState>(s => s.product) as IProductStoreState
    const dispatch = useDispatch()
    const localizer = useStringLocalizer()
    const totalPaginas = Math.floor((productStore?.total / itemsPerPage))

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
                        <Button onClick={getPreviousPage} disabled={page === 0}>{localizer.get("previous")}</Button>
                        <Button disabled>
                            {`${page + 1} ${localizer.get("of")} ${totalPaginas}`}
                        </Button>
                        <Button onClick={getNextPage} disabled={page + 1 === totalPaginas}>{localizer.get("next")}</Button>
                    </ButtonGroup>

                </Grid>
            </Container>
        </AppDrawer>
    )
}