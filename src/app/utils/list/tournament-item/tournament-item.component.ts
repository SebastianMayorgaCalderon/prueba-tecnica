import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.css']
})
export class TournamentItemComponent implements OnInit {
  @Input() tournament;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
