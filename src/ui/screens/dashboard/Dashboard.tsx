import React from "react"
import { Appbar } from "../../components"
import { Container, Grid } from "@material-ui/core"
import { ProductItem } from "../../components/productItem/ProductItem"
import { Product } from "../../../domain"
import { useSelector, useDispatch } from "react-redux"
import { ProductSagaActions } from "../../../actions/sagas/products"
import { IRootState, IProductStoreState } from "../../../stores"

interface IDashboardProps {

}
const itemsPerPage = 20

const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {

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
                    <div>
                        {
                            productStore?.products.map(renderItem)
                        }
                        <div>
                            <button onClick={getPreviousPage}> Previous </button>
                            <button onClick={getNextPage}> Next </button>
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    )
}

export default Dashboard