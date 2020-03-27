import * as React from "react"
import { ViewProduct } from "../"
import { Container, Grid, TextField, makeStyles, Button, Tooltip } from "@material-ui/core"
import { Save, InfoOutlined } from "@material-ui/icons"
import { Product } from "../../../domain"
import { useStringLocalizer } from "../../../contexts/localization"
import { ProductSagaActions } from "../../../actions"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { IRootState } from "../../../stores"

interface IAddProductProps {
}

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        "& div:first-child": {
            flex: 1
        },
        "& div:last-child": {
            flex: 3
        }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        padding: 10
    },
    button: {
        margin: 5,
    },
    descriptionArea: {
        width: "100%"
    },
    previewTitle: {
        marginRight: 8
    }
})

export const AddProduct: React.FunctionComponent<IAddProductProps> = (props) => {

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

    const productEdit = useSelector<IRootState>(x => x.product.selected) as Product | null

    const [name, setName] = React.useState(id ? productEdit?.name ?? "" : "")
    const [description, setDescription] = React.useState(id ? productEdit?.description ?? "" : "")
    const [imageUrl, setImageUrl] = React.useState(id ? productEdit?.imageUrl ?? "" : "")
    const [price, setPrice] = React.useState(id ? productEdit?.price?.toString() ?? "" : "")

    const validatePriceInput = (val: string) => val?.length === 0 || (!!val && !isNaN(+val) && isFinite(+val))
    const validateForm = () => !!name && !!description && !!imageUrl && validatePriceInput(price)
    const createProduct = () => new Product({
        id: id ? Number.parseInt(id) : null ?? 0,
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: validatePriceInput(price) ? +price : 0
    })

    const [previewProduct, setPreview] = React.useState(createProduct())

    const classes = useStyles()
    const localizer = useStringLocalizer()

    return (
        <>
            <Container className={classes.container}>
                <Grid container direction="column" alignItems="center">
                    <h1>
                        {localizer.get(id ? "editProduct" : "addNewProduct")}
                    </h1>
                    <form className={classes.form}>
                        <TextField
                            className={classes.input}
                            label={localizer.get("name")}
                            variant="outlined"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            onBlur={() => setPreview(createProduct())}
                        />
                        <TextField
                            className={classes.input}
                            label={localizer.get("price")}
                            variant="outlined"
                            id="price"
                            value={price}
                            error={!validatePriceInput(price)}
                            helperText={!validatePriceInput(price) ? localizer.get("mustBeANumber") : undefined}
                            onChange={(event) => setPrice(event.target.value)}
                            onBlur={() => setPreview(createProduct())}
                        />
                        <TextField
                            className={classes.input}
                            label={localizer.get("imageUrl")}
                            variant="outlined"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(event) => setImageUrl(event.target.value)}
                            onBlur={() => setPreview(createProduct())}
                        />
                        <Grid container alignItems="center" justify="center">
                            <TextField
                                className={classes.input}
                                label={localizer.get("description")}
                                variant="outlined"
                                id="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                onBlur={() => setPreview(createProduct())}
                                multiline={true}
                                rows={4}
                            />
                            <Tooltip title={localizer.get("supportsMarkdown")} arrow placement="right">
                                <InfoOutlined />
                            </Tooltip>
                        </Grid>
                    </form>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid container justify="center" alignItems="center">
                        <h1 className={classes.previewTitle}> {localizer.get("preview")} </h1>
                        <Tooltip title={localizer.get("previewSubjectToChange")} arrow placement="right">
                            <InfoOutlined />
                        </Tooltip>
                    </Grid>
                    <ViewProduct
                        product={previewProduct}
                    />
                </Grid>
            </Container>

            <Container className={classes.container} maxWidth="xs">
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.button}
                    disabled={!validateForm()}
                    startIcon={<Save />}
                    onClick={() => dispatch({
                        type: id ? ProductSagaActions.Edit : ProductSagaActions.Add,
                        payload: createProduct()
                    })}
                >
                    {localizer.get("save")}
                </Button>
            </Container>
        </>
    )
}