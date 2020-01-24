import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import { Product } from '../../../domain';
import { useStringLocalizer } from '../../../localization';

const useStyles = makeStyles({
    card: {
        maxWidth: 200,
        margin: 10,
        marginTop: 15
    },
});

interface IProductItemProps {
    product: Product
}

export const ProductItem: React.FC<IProductItemProps> = (props) => {
    const classes = useStyles();
    const localizer = useStringLocalizer();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Image of product"
                    height="160"
                    image={props.product.imageUrl}
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
                <Button size="small" color="primary">
                    {localizer.get("save")}
                </Button>
                <IconButton
                    onClick={() => null}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
}