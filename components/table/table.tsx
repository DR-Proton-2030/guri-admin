import {Table} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Box} from '../styles/box';
import {RenderCell} from './render-cell';
import axios from 'axios';

export const TableWrapper = () => {
   const [businesses, setBusinesses] = useState([])
   const columns = [
      {name: 'NAME', uid: 'name'},
      {name: 'LOCATION', uid: 'location'},
      {name: 'POSTED', uid: 'createdAt'},
      {name: 'STATUS', uid: 'status'},
      {name: 'ACTIONS', uid: 'actions'},
   ];

   const getBusiness = async () => {
      try {
         const response = await axios.get('http://localhost:8989/api/v1/business/getBusiness');
         console.log(response.data.result.businesses); // Logging the response data
         setBusinesses(response.data.result.businesses)
      } catch (error) {
         console.error('Error fetching business data:', error);
      }
   }

useEffect(() => {
   getBusiness()
}, [])

   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         <Table
            aria-label="Example table with custom cells"
            css={{
               height: 'auto',
               minWidth: '100%',
               boxShadow: 'none',
               width: '100%',
               px: 0,
            }}
            selectionMode="multiple"
         >
            <Table.Header columns={columns}>
               {(column) => (
                  <Table.Column
                     key={column.uid}
                     hideHeader={column.uid === 'actions'}
                     align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                     {column.name}
                  </Table.Column>
               )}
            </Table.Header>
            <Table.Body items={businesses}>
               {(item) => (
                  <Table.Row>
                     {(columnKey) => (
                        <Table.Cell>
                           {RenderCell({user: item, columnKey: columnKey})}
                        </Table.Cell>
                     )}
                  </Table.Row>
               )}
            </Table.Body>
            <Table.Pagination
               shadow
               noMargin
               align="center"
               rowsPerPage={5}
               onPageChange={(page) => console.log({page})}
            />
         </Table>
      </Box>
   );
};
