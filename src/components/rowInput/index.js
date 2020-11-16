import React, { useMemo } from 'react'
import { TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const UseStyles = makeStyles((theme) => ({
    btnAction: {
        paddingTop: '1rem',
        cursor: 'pointer',
    },
}))

export const RowInput = ({
    handleChangeSubject,
    handleChangeScore,
    handleClickAddRowInput,
    handleClickDeleteRowInput,
    index,
    row,
}) => {
    const classes = UseStyles()

    const useRowInput = useMemo(() => {
        return (
            <Grid container justify="center" spacing={2} key={index + 'container'}>
                <Grid item>
                    <TextField
                        id="subject-textbox"
                        label="Subject"
                        variant="outlined"
                        value={row.subject}
                        onChange={(event) =>
                            handleChangeSubject(event.target.value, index)
                        }
                        key={index + 'subject'}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="score-textbox"
                        label="Score"
                        variant="outlined"
                        value={row.score}
                        onChange={(event) =>
                            handleChangeScore(event.target.value, index)
                        }
                        key={index + 'score'}
                    />
                </Grid>
                <Grid item>
                    {index === 0 ? (
                        <div
                            className={classes.btnAction}
                            onClick={() => handleClickAddRowInput()}
                        >
                            <AddCircleIcon />
                        </div>
                    ) : (
                        <div
                            className={classes.btnAction}
                            onClick={() => handleClickDeleteRowInput(index)}
                        >
                            <DeleteIcon />
                        </div>
                    )}
                </Grid>
            </Grid>
        )
    }, [
        row,
        handleChangeSubject,
        handleChangeScore,
        handleClickAddRowInput,
        handleClickDeleteRowInput,
        index,
        classes,
    ])

    return (
        <div>
            {useRowInput}
        </div>
    )
}

export default RowInput
