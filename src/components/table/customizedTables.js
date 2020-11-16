import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#fb8409',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
})

const CustomizedTables = ({
    data = [
        { subject: 'c#', score: '60', grade: 'C' },
        { subject: 'js', score: '70', grade: 'B' },
    ],
}) => {
    const classes = useStyles()

    return (
        <TableContainer component={Paper} id="table-container">
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell id="table-cell-no">
                            No.
                        </StyledTableCell>
                        <StyledTableCell id="table-cell-title" align="center">
                            Subject
                        </StyledTableCell>
                        <StyledTableCell id="table-cell-date" align="center">
                            Score
                        </StyledTableCell>
                        <StyledTableCell id="table-cell-grade" align="center">
                            Grade
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length
                        ? data.map((row, index) => (
                              <StyledTableRow key={index+'row'}>
                                  <StyledTableCell component="th" scope="row">
                                      {index + 1}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                      {row.subject}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                      {row.score}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                      {row.grade}
                                  </StyledTableCell>
                              </StyledTableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
            {!data.length && (
                <>
                    <p>No Data</p>
                </>
            )}
        </TableContainer>
    )
}

export default CustomizedTables
