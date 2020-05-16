import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState, ICartStoreState, IProductCartItem } from '../../../stores'
import { Container, List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, ListItemAvatar, Avatar, Button, Grid, Typography, Divider } from '@material-ui/core'
import { DeleteOutline, RemoveOutlined, AddOutlined, AttachMoneyOutlined, PaymentOutlined } from "@material-ui/icons"
import { Spacer } from '../../components'
import { useStringLocalizer } from '../../../contexts'

export const Cart: React.FC = () => {

    const cartStore = useSelector<IRootState>(x => x.cart) as ICartStoreState
    const localizer = useStringLocalizer()
    const dispatch = useDispatch()

    const removeItem = (item: IProductCartItem) => { }
    const deleteItem = (item: IProductCartItem) => { }
    const addMore = (item: IProductCartItem) => { }

    const renderItems = () =>
        cartStore.products.map((item, index) =>
            <>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            {index.toString()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${item.product.name}`}
                        secondary={`x ${item.quantity}`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="remove" onClick={() => removeItem(item)}>
                            <RemoveOutlined />
                        </IconButton>
                        <IconButton edge="end" aria-label="addMore" onClick={() => addMore(item)}>
                            <AddOutlined />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
                            <DeleteOutline />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </>
        )

    return (
        <Container maxWidth="xl">

            <Typography variant="h5">
                {localizer.get("cart")}
            </Typography>

            <List>
                {renderItems()}
                {
                    cartStore.products.length === 0
                        ?
                        <Typography>
                            {localizer.get("yourCartIsEmpty")}
                        </Typography>
                        :
                        null
                }
            </List>

            <Grid container alignItems="flex-end" justify="flex-end" direction="row">
                <Button
                    color="primary"
                    startIcon={<AttachMoneyOutlined />}
                >
                    <Typography variant="h6" noWrap={true}>
                        {cartStore.total.toFixed(2)}
                    </Typography>
                </Button>
            </Grid>
            <Spacer height={10} />
            <Grid container alignItems="flex-end" justify="flex-end" direction="row">
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PaymentOutlined />}
                >
                    Order
                </Button>
            </Grid>
        </Container>
    )
}
