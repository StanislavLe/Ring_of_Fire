import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';


  constructor(public dialog: MatDialog) { }


  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log('New game started:', this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      console.log('Played card:' + this.currentCard);
      console.log('game is:', this.game);
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);

        this.pickCardAnimation = false;
      }, 1000);
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
