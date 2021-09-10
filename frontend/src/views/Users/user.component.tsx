import { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Container } from '@material-ui/core';

import PaginationComponent from '../../components/layout/Pagination';
import { useUsersQuery, User } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  })
);

export default function UserComponent() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);

  const { data, loading } = useUsersQuery({
    variables: { usersSkip: page, usersLimit: limit },
  });

  useEffect(() => {
    if (!loading) {
      if (data && data.users) {
        // tslint:disable-next-line:no-shadowed-variable
        const { users } = data;
        // tslint:disable-next-line:prettier
        setUsers(users?.list);
        setCount(users?.count);
        setCount(Math.round(users?.count / limit))
      }
    }
  }, [data, limit, loading, page]);

  // tslint:disable-next-line:no-shadowed-variable
  const onChangePage = (_event: any, page: number) => {
    setPage(page);
  };

  const onChangeLimit = (value: number) => {
    setLimit(value);
  };

  return (
    <Container>
      <List className={classes.root} subheader={<li />}>
        {users.length &&
          users.map(({ email }) => (
            <li key={`section-${email}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListItem>{email}</ListItem>
              </ul>
            </li>
          ))}
      </List>
      <PaginationComponent
        onChangeLimit={onChangeLimit}
        onChangePage={onChangePage}
        page={page +1}
        count={count}
        limit={limit}
      />
    </Container>
  );
}
