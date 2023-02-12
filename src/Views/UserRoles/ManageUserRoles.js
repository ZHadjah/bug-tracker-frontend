import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export function ManageUserRoles() {
  return (
      <List>
        <Datagrid>
          <TextField source='Full Name' />
          <TextField source='Email' />
          <TextField source='Role' />
          <EditButton />
        </Datagrid>
      </List>
  )
}

