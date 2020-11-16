import { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import Nav from '../nav/nav'
import CustomizedTables from '../table/customizedTables'
import RowInput from '../rowInput'
import { calculateGrade } from '../../services'

const UseStyles = makeStyles((theme) => ({
    containerStyle: {
        paddingTop: '8rem',
    },
    input: {
        border: '1px solid black',
    },
    blockItem: {
        padding: '1rem',
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
    },
    Skeleton: {
        width: '600px',
    },
}))
const initRowInput = {
    subject: '',
    score: 0,
}
const Container = () => {
    const classes = UseStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [rowInputData, setRowInputData] = useState([initRowInput])
    const [caluculateData, setCaluculateData] = useState([])

    const handleChangeSubject = (value, index) => {
        const changeSubjectValue = rowInputData.map((row, ib) => {
            if (index === ib) {
                return {
                    ...row,
                    subject: value,
                }
            }

            return row
        })
        setRowInputData(changeSubjectValue)
    }

    const handleChangeScore = (value, index) => {
        const valueMutable = value === '' ? '0' : value
        const validate = /^-?\d*$/.test(valueMutable)
        if (validate && parseInt(valueMutable) <= 100) {
            const changeScoreValue = rowInputData.map((row, ib) => {
                if (index === ib) {
                    return {
                        ...row,
                        score: parseInt(valueMutable),
                    }
                }

                return row
            })

            setRowInputData(changeScoreValue)
        }
    }

    const handleClickAddRowInput = () => {
        setRowInputData([...rowInputData, initRowInput])
    }

    const handleClickDeleteRowInput = (index) => {
        const rowInputDeleted = rowInputData.filter((row, ib) => ib !== index)
        setRowInputData([...rowInputDeleted])
    }

    const handleCalculate = async (rowInputData) => {
        setIsLoading(true)
        const resualt = await calculateGrade(rowInputData)

        setCaluculateData(resualt.data)
        setIsLoading(false)
    }

    const handleClear = () => {
        setCaluculateData([])
        setRowInputData([initRowInput])
    }

    return (
        <>
            <Nav />
            <Grid container className={classes.containerStyle} spacing={2}>
                <Grid className={classes.blockItem}>
                    {rowInputData.map((row, index) => (
                        <RowInput
                            handleChangeSubject={handleChangeSubject}
                            handleChangeScore={handleChangeScore}
                            handleClickAddRowInput={handleClickAddRowInput}
                            handleClickDeleteRowInput={
                                handleClickDeleteRowInput
                            }
                            row={row}
                            index={index}
                            key={index+'rowInput'}
                        />
                    ))}
                </Grid>
                <Grid className={classes.blockItem}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <Button
                                id="btn-calculate"
                                variant="outlined"
                                color="primary"
                                onClick={() => handleCalculate(rowInputData)}
                            >
                                Calculate
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                id="btn-clear"
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleClear()}
                            >
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.blockItem}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            {isLoading ? (
                                <div className={classes.Skeleton}>
                                    <Skeleton />
                                    <Skeleton animation={false} />
                                    <Skeleton animation="wave" />
                                </div>
                            ) : (
                                <CustomizedTables data={caluculateData} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Container
