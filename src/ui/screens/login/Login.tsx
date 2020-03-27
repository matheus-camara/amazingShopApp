import React from "react"
import { Grid, Paper, List, ListItem, TextField, Button, makeStyles, Container, CssBaseline, Link, IconButton } from "@material-ui/core"
import { useStringLocalizer } from "../../../contexts"
import { Spacer } from "../../components"
import { VerifiedUserOutlined, ArrowBackOutlined } from "@material-ui/icons"
import { useDispatch } from "react-redux"
import { UserSagaActions } from "../../../actions"
import { Login_background } from "../../../static/images"
import { useHistory } from "react-router-dom"
import { Routes } from "../../../constants/routes"

const useStyles = makeStyles({
    content: {
        height: "100vh",
        background: `url("${Login_background}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    container: {
        padding: 80,
        height: "100%",
        width: "100%"
    },
    paper: {
        padding: 20,
    }
})


export const Login: React.FC = () => {

    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [nameError, setNameError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)

    const localizer = useStringLocalizer()
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()

    const loginAction = () => {
        dispatch({
            type: UserSagaActions.Login,
            payload: {
                name,
                password
            }
        })
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl" className={classes.content} component="div">
                <Grid
                    className={classes.container}
                    container
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                    direction="column"
                >
                    <Paper elevation={3} className={classes.paper}>
                        <List>
                            <ListItem alignItems="flex-start">
                                <IconButton onClick={() => history.goBack()}>
                                    <ArrowBackOutlined>

                                    </ArrowBackOutlined>
                                </IconButton>
                            </ListItem>
                            <ListItem alignItems="center" >
                                <TextField
                                    label={localizer.get("name")}
                                    variant="outlined"
                                    id="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    error={nameError}
                                    helperText={nameError ? localizer.get("fieldIsRequired") : undefined}
                                    onBlur={() => setNameError(!name)}
                                />
                            </ListItem>
                            <ListItem alignItems="center" >
                                <TextField
                                    label={localizer.get("password")}
                                    variant="outlined"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    error={passwordError}
                                    helperText={passwordError ? localizer.get("fieldIsRequired") : undefined}
                                    onBlur={() => setPasswordError(!password)}
                                />
                            </ListItem>
                            <ListItem alignItems="center" >
                                <Grid
                                    container
                                    alignItems="center"
                                    justify="center"
                                    direction="column"
                                >
                                    <Spacer height={10}></Spacer>
                                    <Button
                                        disabled={!name || !password}
                                        variant="contained"
                                        color="primary"
                                        onClick={loginAction}
                                        endIcon={<VerifiedUserOutlined />}
                                    >
                                        {localizer.get("login")}
                                    </Button>
                                    <Spacer height={10}></Spacer>
                                    <Link
                                        color="textPrimary"
                                        component="button"
                                        variant="body2"
                                        onClick={() => history.push(Routes.REGISTER_PAGE)}
                                    >
                                        {localizer.get("createAccount")}
                                    </Link>
                                </Grid>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}