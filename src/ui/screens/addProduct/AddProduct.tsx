import * as React from "react"
import { ViewProduct } from "../"
import { Container, Grid, TextField, makeStyles, Button, TextareaAutosize } from "@material-ui/core"
import { Save } from "@material-ui/icons"
import { Product } from "../../../domain"
import { useStringLocalizer } from "../../../contexts/localization"
import { ProductSagaActions } from "../../../actions"
import { useDispatch } from "react-redux"
import ReactMarkdown from "react-markdown"

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
    }
})

export const AddProduct: React.FunctionComponent<IAddProductProps> = (props) => {

    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [imageUrl, setImageUrl] = React.useState("")
    const [price, setPrice] = React.useState("")

    const validatePriceInput = (val: string) => val?.length === 0 || (!!val && !isNaN(+val) && isFinite(+val))
    const validateForm = () => !!name && !!description && !!imageUrl && validatePriceInput(price)
    const createProduct = () => new Product({
        id: 0,
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: validatePriceInput(price) ? +price : 0
    })

    const [previewProduct, setPreview] = React.useState(createProduct())

    const classes = useStyles()
    const localizer = useStringLocalizer()
    const dispatch = useDispatch()

    return (
        <>
            <Container className={classes.container}>
                <Grid container direction="column" alignItems="center">
                    <h1>
                        {localizer.get("addNewProduct")}
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
                        <TextField
                            className={classes.input}
                            label={localizer.get("description")}
                            variant="outlined"
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            onBlur={() => setPreview(createProduct())}
                        />
                        <TextareaAutosize
                            id="description"
                            className={classes.descriptionArea}
                            rowsMin={5}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            onBlur={() => setPreview(createProduct())}
                        >
                            <ReactMarkdown>
                            </ReactMarkdown>
                        </TextareaAutosize>
                    </form>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <h1> {localizer.get("preview")} </h1>
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
                        type: ProductSagaActions.Add,
                        payload: createProduct()
                    })}
                >
                    {localizer.get("save")}
                </Button>
            </Container>
        </>
    )
}