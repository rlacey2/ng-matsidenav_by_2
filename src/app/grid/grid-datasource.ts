import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface GridRowItem {
  name: string;
  id: number;
}

const COUNTY_DATA: GridRowItem[] = [
  { id: 1, name: 'Wexford' },
  { id: 2, name: 'Dublin' },
  { id: 3, name: 'Waterford' },
  { id: 4, name: 'Kerry' },
  { id: 5, name: 'Derry' },
  { id: 6, name: 'Galway' },
  { id: 7, name: 'Wicklow' },
  { id: 8, name: 'Louth' },
  { id: 9, name: 'Cork' },
  { id: 10, name: 'Carlow' },
  { id: 11, name: 'Kilkenny' },
  { id: 12, name: 'Mayo' },
  { id: 13, name: 'Down' },
  { id: 14, name: 'Antrim' },
  { id: 15, name: 'Sligo' },
  { id: 16, name: 'Donegal' },
  { id: 17, name: 'Tipperary' },
  { id: 18, name: 'Longford' },
  { id: 19, name: 'Meath' },
  { id: 20, name: 'Clare' },
  { id: 21, name: 'Leitrim' },
]

/*  sorting comparator */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



/* 
   Data source for the Table view. This should handle
   the business logic for fetching and manipulating the displayed data:
   filtering, pagination, sorting
 */
export class TableDataSource extends DataSource<GridRowItem> {
  data: GridRowItem[] = COUNTY_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /*
     Connect this data source to the table, will  update when the returned stream emits new values.
   */
  connect(): Observable<GridRowItem[]> {
    if (this.paginator && this.sort) {
      // merge everything that affects the rendered data into one update stream for the grid-table to use.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      )
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Set the paginator and sort on the data source.');
    }
  }

  /*
    When the table is being destroyed, this function is used clean up connections etc.
   */

  disconnect(): void { }

  /*
    Paginate the data locally, when on the server use relevant db techniques if available.
   */
  private getPagedData(data: GridRowItem[]): GridRowItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize); // get the relevant sub set
    } else {
      return data;
    }
  }

  /*
    Sort the data locally, when on the server use relevant db sorting.
   */
  private getSortedData(data: GridRowItem[]): GridRowItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      // a..z or z..a
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

