import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export function CompaniesRead() {
  return (
      <List>
        <Datagrid>
          <TextField source='title' />
          <TextField source='Description' />
          <TextField source='Created' />
          <TextField source='Updated' />
          <TextField source='Archvied' />
          <EditButton />
        </Datagrid>
      </List>
  )
}

