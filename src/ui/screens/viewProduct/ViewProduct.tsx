import React from 'react'
import { AppDrawer } from "../../components"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ProductSagaActions } from "../../../actions"
import { IRootState } from '../../../stores';
import { Product } from '../../../domain';
import { Typography, Divider, Container, makeStyles, CardMedia, Card, CardContent, List, ListItem } from '@material-ui/core';
import { blankImage } from '../../../static/images';

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
    }
})

export const ViewProduct: React.FC = () => {

    const { id } = useParams<{ id: string }>()
    const dispath = useDispatch()

    React.useEffect(() => {
        const loadData = () => {
            dispath({
                type: ProductSagaActions.GetDetailed,
                payload: Number.parseInt(id)
            })
        }

        loadData();
    }, [id, dispath])

    const classes = useStyles()
    const product = useSelector<IRootState>(state => state.product.selected) as Product

    return (
        <AppDrawer>
            <Container maxWidth="lg" className={classes.container}>
                <List component="nav" >
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Card className={classes.imageContainer}>
                            <CardContent>
                                <CardMedia
                                    height={300}
                                    component="img"
                                    alt="Image of product"
                                    image={product?.imageUrl === "" ? blankImage : product?.imageUrl}
                                    title="product image"
                                />
                            </CardContent>
                        </Card>
                    </ListItem>
                    <Divider />
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Typography color="primary" variant="h4">
                            {product?.name}
                        </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Typography>
                            {product?.description}
                        </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem alignItems="center" className={classes.listItem}>
                        <Typography>
                            {product?.price}
                        </Typography>
                    </ListItem>
                </List>
            </Container>
        </AppDrawer>
    )
}