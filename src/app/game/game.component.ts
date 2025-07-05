import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  game: Game = new Game();
  gameId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('GameId:', this.gameId);

      if (this.gameId) {
        const gameDocRef = doc(this.firestore, 'games', this.gameId);
        docData(gameDocRef).subscribe((gameData: any) => {
          if (gameData) {
            this.game.currentPlayer = gameData.currentPlayer;
            this.game.playedCard = gameData.playedCard;
            this.game.players = gameData.players;
            this.game.stack = gameData.stack;
            this.game.pickCardAnimation = gameData.pickCardAnimation;
            this.game.currentCard = gameData.currentCard;
          }
        });
      }
    });
  }

takeCard() {
  if (!this.game.pickCardAnimation) {
    this.game.currentCard = this.game.stack.pop() || '';
    this.game.pickCardAnimation = true;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCard.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
    }, 1000);
  }
}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    if (this.gameId) {
      const gameDocRef = doc(this.firestore, 'games', this.gameId);
      await updateDoc(gameDocRef, this.game.toJson());
    }
  }
}
