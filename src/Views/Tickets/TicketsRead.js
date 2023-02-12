import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export function TicketsRead(props) {
  return (
      <List {...props}>
        <Datagrid>
          <TextField source='title' />
          <EditButton />
        </Datagrid>
      </List>
  )
}

