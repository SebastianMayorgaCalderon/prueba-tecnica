import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.css']
})
export class MatchListItemComponent implements OnInit {
  @Input() match;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
