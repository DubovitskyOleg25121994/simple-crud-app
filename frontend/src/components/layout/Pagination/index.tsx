import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import SimpleSelect from '../../forms/Select';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface IPropsPagination {
  onChangeLimit: (event: any) => void;
  onChangePage: (_event: any, page: number) => void;
  count: number;
  page: number;
  limit: number;
}

export default function PaginationComponent({
  onChangeLimit,
  onChangePage,
  count,
  page,
  limit,
}: IPropsPagination) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleSelect limit={limit} onChangeCount={onChangeLimit} />
      <Typography>Page: {page}</Typography>
      <Pagination count={count} page={page} onChange={onChangePage} />
    </div>
  );
}
