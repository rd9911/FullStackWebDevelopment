import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Paper } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Link } from 'react-router-dom'


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

const Row = (props) => {
  const { row } = props
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <Link to={`/user-list/${row.id}`}>{ row.username }</Link>
        </TableCell>
        <TableCell align='right'>{row.blogs.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell styel={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>Blogs</Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align='right'>Author</TableCell>
                    <TableCell align='right'>Url</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { row.blogs.map( (blog) => (
                    <TableRow key={blog.id}>
                      <TableCell component='th' scope='row'>{blog.title}</TableCell>
                      <TableCell align='right'>{blog.author}</TableCell>
                      <TableCell align='right'>{blog.url}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired
  }).isRequired
}
const CollapsibleTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell align='right'>Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { props.rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollapsibleTable