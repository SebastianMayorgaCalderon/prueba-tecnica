import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pageable-controls',
  templateUrl: './pageable-controls.component.html',
  styleUrls: ['./pageable-controls.component.css']
})
export class PageableControlsComponent implements OnInit {
  @Input() onNextPage;
  @Input() onPreviousPage;
  @Input() currentPage;
  @Input() cantPages;
  @Input() canGoFoward;
  @Input() canGoBackward;
  constructor() { }

  ngOnInit() {
  }
  netxPage() {
    this.onNextPage();
  }
  previousPage() {
    this.onPreviousPage();
  }

}
