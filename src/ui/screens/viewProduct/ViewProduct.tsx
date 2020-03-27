import React from 'react'
import clsx from 'clsx'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSagaActions, ProductStoreActions } from "../../../actions"
import { IRootState } from '../../../stores'
import { Product } from '../../../domain'
import { Typography, Divider, Container, makeStyles, CardMedia, Card, CardContent, List, ListItem, Paper, Grid, IconButton, TextField, Button } from '@material-ui/core'
import { AddShoppingCart, AttachMoneyOutlined, ChevronLeft, ChevronRight, Edit, Delete } from "@material-ui/icons"
import { useSnackbar } from "notistack"
import { blankImage } from '../../../static/images'
import { useStringLocalizer } from '../../../contexts'
import { Routes } from '../../../constants/routes'
import { Markdown, Spacer } from "../../components"

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    imageContainer: {
        maxHeight: "40%",
        width: "60%",
    },
    list: {
        minWidth: "60%"
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
    button: {
        marginRight: 5
    },
    buttonEdit: {
        backgroundColor: "green"
    },
    buttonDelete: {
        backgroundColor: "red"
    }
})

interface IViewProductProps {
    product?: Product
}

export const ViewProduct: React.FC<IViewProductProps> = (props) => {

    const { id } = useParams<{ id?: string }>()
    const dispatch = useDispatch()

    React.useEffect(() => {
        const loadData = () => {
            if (id) {
                dispatch({
                    type: ProductSagaActions.GetDetailed,
                    payload: Number.parseInt(id)
                })
            }
        }

        loadData();
    }, [id, dispatch])

    const [quantity, setQuantity] = React.useState("0")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const localizer = useStringLocalizer()
    const history = useHistory()
    const classes = useStyles()
    const actionsDisabled = !!props.product

    const { authenticated, ...state } = useSelector<IRootState>(state => {
        return {
            product: state.product.selected,
            authenticated: state.authentication.authenticated
        }
    }) as { product: Product, authenticated: boolean }

    let { product } = state
    product = props.product ? props.product : product

    const addToCart = () => dispatch({
        type: ProductStoreActions.AddToCart,
        payload: {
            product,
            quantity: +quantity
        }
    })

    const deleteProduct = () => {

        const deleteAction = (key: any) => {
            dispatch({
                type: ProductSagaActions.Delete,
                payload: product.id
            })
            closeSnackbar(key)
        }

        const confirmDeleteAction = (key: any) => (
            <>
                <Button onClick={() => deleteAction(key)} variant="contained" color="secondary" className={classes.button}>
                    {localizer.get("yes")}
                </Button>
                <Button onClick={() => closeSnackbar(key)} variant="contained" color="secondary">
                    {localizer.get("no")}
                </Button>
            </>
        );

        enqueueSnackbar(localizer.get("areYouSure"), {
            variant: "info",
            autoHideDuration: 3000,
            action: (key) => confirmDeleteAction(key),
        });
    }

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <List component="nav" className={classes.list}>
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Card className={classes.imageContainer}>
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    alt="Image of product"
                                    height={400}
                                    image={(product?.imageUrl ?? "") === "" ? blankImage : product?.imageUrl}
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
                    <Divider variant="fullWidth" />
                    <Spacer height={40} />
                    <ListItem>
                        <Typography>
                            {localizer.get("description")}
                        </Typography>
                    </ListItem>
                    <Divider variant="fullWidth" />
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Markdown className={classes.description} key={product?.description.substring(0, 20)}>
                            {product?.description ?? ""}
                        </Markdown>
                    </ListItem>
                    <Divider variant="fullWidth" />
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
                    <ListItem className={clsx(
                        classes.listItem,
                        classes.price
                    )}>
                        <IconButton onClick={() => setQuantity(+quantity === 0 ? quantity : `${+quantity - 1}`)} disabled={actionsDisabled}>
                            <ChevronLeft />
                        </IconButton>
                        <TextField
                            inputMode="numeric"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            fullWidth={false}
                            size="small"
                            className={classes.quantityInput}
                        />
                        <IconButton onClick={() => setQuantity(`${+quantity + 1}`)} disabled={actionsDisabled}>
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
                    <Divider />
                    <Spacer height={60}></Spacer>
                    <ListItem>
                        <Button
                            disabled={actionsDisabled}
                            className={classes.button}
                            variant="contained"
                            color="default"
                            onClick={addToCart}
                            startIcon={<AddShoppingCart />}
                        >
                            {localizer.get("addToCart")}
                        </Button>
                        {
                            authenticated ?
                                <>
                                    <Button
                                        disabled={actionsDisabled}
                                        className={classes.button}
                                        color="primary"
                                        variant="contained"
                                        onClick={() => id ? history.push(Routes.EDIT_PRODUCT_PAGE.replace(":id", id)) : null}
                                        startIcon={<Edit />}
                                    >
                                        {localizer.get("edit")}
                                    </Button>
                                    <Button
                                        disabled={actionsDisabled}
                                        className={classes.button}
                                        color="secondary"
                                        variant="contained"
                                        onClick={deleteProduct}
                                        startIcon={<Delete />}
                                    >
                                        {localizer.get("delete")}
                                    </Button>
                                </> :
                                null
                        }
                    </ListItem>
                </List>
            </Container>
        </>
    )
}