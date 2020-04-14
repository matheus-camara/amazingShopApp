import React from 'react'
import { Grid, TextField, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles } from '@material-ui/core'
import { useStringLocalizer } from '../../../contexts'
import { FilterListOutlined, ExpandMoreOutlined } from '@material-ui/icons'

const useStyles = makeStyles({
    button: {
        marginTop: 15
    }
})

interface IDashboardFilterProps {
    onSubmit: (priceStart: string, priceEnd: string) => void
}

export const DashboardFilter: React.FC<IDashboardFilterProps> = (props) => {

    const [priceStart, setPriceStart] = React.useState("0")
    const [priceEnd, setPriceEnd] = React.useState("0")
    const localizer = useStringLocalizer()
    const { onSubmit } = props
    const classes = useStyles()

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreOutlined></ExpandMoreOutlined>}
            >
                {localizer.get("filters")}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid
                    container
                    alignContent="center"
                    alignItems="center"
                    direction="column"
                >
                    <Grid>
                        <TextField
                            label={localizer.get("startsAt")}
                            inputMode="numeric"
                            value={priceStart}
                            onChange={(e) => setPriceStart(e.target.value)}
                            fullWidth={false}
                            size="small"

                        />

                        <TextField
                            label={localizer.get("upTo")}
                            inputMode="numeric"
                            value={priceEnd}
                            onChange={(e) => setPriceEnd(e.target.value)}
                            fullWidth={false}
                            size="small"
                        />
                    </Grid>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="default"
                        onClick={() => onSubmit(priceStart, priceEnd)}
                        startIcon={<FilterListOutlined />}
                    >
                        {localizer.get("filter")}
                    </Button>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
