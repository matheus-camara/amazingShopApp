import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton, Button } from "@material-ui/core"
import { blankImage } from "../../../static/images"
import { AddShoppingCart, AttachMoneyOutlined } from "@material-ui/icons"
import { Product } from "../../../domain"
import { useHistory } from "react-router-dom"
import { Routes } from "../../../constants/routes"

const useStyles = (width: number) => makeStyles({
    card: {
        maxHeight: 360,
        width: width,
    },
    cardWrapper: {
        padding: 10
    }
})()

interface IProductItemProps {
    product: Product
}

export const ProductItem: React.FC<IProductItemProps> = (props) => {
    const [height, maxWidth] = [160, 260]

    const classes = useStyles(maxWidth)
    const history = useHistory()
    console.log(props)

    return (
        <div className={classes.cardWrapper}>
            <Card className={classes.card} onClick={() => history.push(Routes.VIEW_PRODUCT_PAGE.replace(":id", props.product.id.toString()))}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Image of product"
                        height={height}
                        image={props.product.imageUrl === "" ? blankImage : props.product.imageUrl}
                        title="product image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton
                        onClick={() => null}
                    >
                        <AddShoppingCart />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AttachMoneyOutlined />}
                        onClick={() => null}
                    >
                        <Typography variant="h6" noWrap={true}>
                            {props.product.price.toFixed(2)}
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}