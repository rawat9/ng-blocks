import { computed, Directive, input } from '@angular/core'

import { cn, type ClassValue } from 'cnfast'

@Directive({
  selector: 'div[appTableContainer]',
  host: {
    'data-slot': 'table-container',
    '[class]': 'tableContainerClass()'
  }
})
export class TableContainer {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly tableContainerClass = computed(() =>
    cn(this._class(), 'relative w-full overflow-x-auto')
  )
}

@Directive({
  selector: 'table[appTable]',
  host: {
    'data-slot': 'table',
    '[class]': 'tableClass()'
  }
})
export class Table {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly tableClass = computed(() =>
    cn(this._class(), 'w-full caption-bottom text-sm')
  )
}

@Directive({
  selector: 'thead[appTableHead]',
  host: {
    'data-slot': 'table-head',
    '[class]': 'tableHeadClass()'
  }
})
export class TableHead {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly tableHeadClass = computed(() =>
    cn(this._class(), '[&_tr]:border-b')
  )
}

@Directive({
  selector: 'tbody[appTableBody]',
  host: {
    'data-slot': 'table-body',
    '[class]': 'tableBodyClass()'
  }
})
export class TableBody {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly tableBodyClass = computed(() =>
    cn(this._class(), '[&_tr:last-child]:border-0')
  )
}

@Directive({
  selector: 'tr[appTableRow]',
  host: {
    'data-slot': 'table-row',
    '[class]': 'tableRowClass()'
  }
})
export class TableRow {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly tableRowClass = computed(() =>
    cn(
      this._class(),
      'border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted'
    )
  )
}

@Directive({
  selector: 'td[appTableCell]',
  host: {
    'data-slot': 'table-cell',
    '[class]': 'tableCellClass()'
  }
})
export class TableCell {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly tableCellClass = computed(() =>
    cn(
      this._class(),
      'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
    )
  )
}
