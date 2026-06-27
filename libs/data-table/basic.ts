import { Component, signal } from '@angular/core'
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel
} from '@tanstack/angular-table'
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '../ui/table'

interface Person {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10
  }
]

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => `<i>${info.getValue<string>()}</i>`,
    header: () => `<span>Last Name</span>`,
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'visits',
    header: () => `<span>Visits</span>`,
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: (info) => info.column.id
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: (info) => info.column.id
  }
]

@Component({
  selector: 'app-basic-data-table',
  imports: [
    FlexRenderDirective,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell
  ],
  template: `
    <div class="p-2" appTableContainer>
      <table appTable>
        <thead appTableHead>
          @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
            <tr appTableRow>
              @for (header of headerGroup.headers; track header.id) {
                @if (!header.isPlaceholder) {
                  <th>
                    <ng-container
                      *flexRender="
                        header.column.columnDef.header;
                        props: header.getContext();
                        let header
                      "
                    >
                      <div [innerHTML]="header"></div>
                    </ng-container>
                  </th>
                }
              }
            </tr>
          }
        </thead>
        <tbody appTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr appTableRow>
              @for (cell of row.getVisibleCells(); track cell.id) {
                <td appTableCell>
                  <ng-container
                    *flexRender="
                      cell.column.columnDef.cell;
                      props: cell.getContext();
                      let cell
                    "
                  >
                    <div [innerHTML]="cell"></div>
                  </ng-container>
                </td>
              }
            </tr>
          }
        </tbody>
        <tfoot appTableFoot>
          @for (footerGroup of table.getFooterGroups(); track footerGroup.id) {
            <tr appTableRow>
              @for (footer of footerGroup.headers; track footer.id) {
                <th appTableCell>
                  <ng-container
                    *flexRender="
                      footer.column.columnDef.footer;
                      props: footer.getContext();
                      let footer
                    "
                  >
                    {{ footer }}
                  </ng-container>
                </th>
              }
            </tr>
          }
        </tfoot>
      </table>

      <div class="h-4"></div>
      <button (click)="rerender()" class="border p-2">Rerender</button>
    </div>
  `
})
export class BasicDataTable {
  data = signal<Person[]>(defaultData)

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  }))

  rerender() {
    this.data.set([...defaultData.sort(() => -1)])
  }
}
