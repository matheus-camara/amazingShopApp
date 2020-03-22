import React from 'react'
import { AppDrawer } from "../../components"
import clsx from 'clsx';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSagaActions, ProductStoreActions } from "../../../actions"
import { IRootState } from '../../../stores'
import { Product } from '../../../domain'
import { Typography, Divider, Container, makeStyles, CardMedia, Card, CardContent, List, ListItem, Paper, Grid, IconButton, TextField, Button } from '@material-ui/core'
import { AddShoppingCart, AttachMoneyOutlined, ChevronLeft, ChevronRight, Edit, Delete } from "@material-ui/icons"
import { useSnackbar } from "notistack"
import { blankImage } from '../../../static/images'
import { useStringLocalizer } from '../../../contexts';
import { Routes } from '../../../constants/routes';

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    imageContainer: {
        maxHeight: "40%",
        maxWidth: "60%"
    },
    listItem: {
        justifyContent: "center"
    },
    title: {
        textTransform: "capitalize"
    },
    description: {
        textTransform: "capitalize"
    },
    price: {
        justifyContent: "flex-end"
    },
    paperPrice: {
        padding: 8
    },
    totalPrice: {
        padding: 8,
        width: "15%",
        display: "flex",
        '& div:first-child': {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "capitalize",
            fontWeight: "bold"
        },
        '& div:last-child': {
            flex: 3,
            flexWrap: "nowrap",
            fontWeight: "bold",

        },
    },
    totalContainer: {
        alignSelf: "flex-start"
    },
    quantityInput: {
        maxWidth: 40,
        marginRight: 5,
        justifyContent: "center",
        "& div input": {
            textAlign: "center"
        }
    },
    buttonEdit: {
        backgroundColor: "green"
    },
    buttonDelete: {
        backgroundColor: "red"
    }
})

export const ViewProduct: React.FC = () => {

    const { id } = useParams<{ id: string }>()
    const [quantity, setQuantity] = React.useState("0")
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        const loadData = () => {
            dispatch({
                type: ProductSagaActions.GetDetailed,
                payload: Number.parseInt(id)
            })
        }

        loadData();
    }, [id, dispatch])

    const localizer = useStringLocalizer()
    const history = useHistory()
    const classes = useStyles()
    const product = useSelector<IRootState>(state => state.product.selected) as Product

    const addToCart = () => dispatch({
        type: ProductStoreActions.AddToCart,
        payload: {
            product,
            quantity: +quantity
        }
    })

    const deleteProduct = () => {

        const deleteAction = () => dispatch({
            type: ProductSagaActions.Delete,
            payload: product.id
        })

        const undoDeleteAction = () => (
            <Button onClick={deleteAction}>
                {localizer.get("yes")}
            </Button>
        );

        enqueueSnackbar(localizer.get("areYouSure"), {
            variant: "warning",
            autoHideDuration: 3000,
            action: undoDeleteAction,
        });
    }

    return (
        <AppDrawer>
            <Container maxWidth="lg" className={classes.container}>
                <List component="nav" >
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Card className={classes.imageContainer}>
                            <CardContent>
                                <CardMedia
                                    height={400}
                                    component="img"
                                    alt="Image of product"
                                    image={product?.imageUrl === "" ? blankImage : product?.imageUrl}
                                    title="product image"
                                />
                            </CardContent>
                        </Card>
                    </ListItem>
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Typography color="primary" variant="h4" className={classes.title}>
                            {product?.name}
                        </Typography>
                    </ListItem>
                    <Divider variant="inset" />
                    <ListItem>
                        <Typography>
                            {localizer.get("description")}
                        </Typography>
                    </ListItem>
                    <Divider variant="fullWidth" />
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Typography className={classes.description}>
                            {product?.description}
                        </Typography>
                    </ListItem>
                    <Divider variant="inset" />
                    <ListItem className={clsx(
                        classes.listItem,
                        classes.price
                    )}>
                        <Paper elevation={2} variant="outlined" className={classes.paperPrice}>
                            <Grid container alignItems="center" justify="center" direction="row">
                                <AttachMoneyOutlined />
                                <Typography variant="h5">
                                    <strong>
                                        {product?.price}
                                    </strong>
                                </Typography>
                            </Grid>
                        </Paper>
                    </ListItem>
                    <Divider />
                    <ListItem className={clsx(
                        classes.listItem,
                        classes.price
                    )}>
                        <IconButton onClick={() => setQuantity(+quantity === 0 ? quantity : `${+quantity - 1}`)}>
                            <ChevronLeft />
                        </IconButton>
                        <TextField
                            inputMode="numeric"
                            defaultValue={quantity}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            fullWidth={false}
                            size="small"
                            className={classes.quantityInput}
                        />
                        <IconButton onClick={() => setQuantity(`${+quantity + 1}`)}>
                            <ChevronRight />
                        </IconButton>
                        <Paper elevation={2} variant="outlined" className={classes.totalPrice}>
                            <div>
                                {localizer.get("total")}
                            </div>
                            <Grid container alignItems="center" justify="center" direction="row">
                                <AttachMoneyOutlined />
                                <Typography variant="h5" noWrap={true}>
                                    {(product?.price * +quantity).toFixed(2)}
                                </Typography>
                            </Grid>
                        </Paper>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={addToCart}
                            startIcon={AddShoppingCart}
                        >
                            {localizer.get("addToCart")}
                        </Button>
                        <Button
                            className={classes.buttonEdit}
                            onClick={() => history.push(Routes.EDIT_PRODUCT_PAGE.replace(":id", id))}
                            startIcon={Edit}
                        >
                            {localizer.get("edit")}
                        </Button>
                        <Button
                            className={classes.buttonDelete}
                            onClick={deleteProduct}
                            startIcon={Delete}
                        >
                        </Button>
                    </ListItem>
                </List>
            </Container>
        </AppDrawer>
    )
}