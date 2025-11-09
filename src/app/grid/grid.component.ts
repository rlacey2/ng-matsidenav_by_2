import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource, GridRowItem } from './grid-datasource';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid.d-flex.flex-column.overflow-hidden.h-100', // NB these classes to maintain response scrolling
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  standalone: true,
  imports: [ MatPaginatorModule, MatSortModule, MatTableModule , RouterLink ]
})

export class GridComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GridRowItem>;
 
  gridSource = new TableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.gridSource.sort = this.sort;
    this.gridSource.paginator = this.paginator;
    this.table.dataSource = this.gridSource;
  }
}
