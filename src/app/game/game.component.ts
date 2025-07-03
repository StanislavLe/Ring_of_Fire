import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';


  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.newGame();

    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      console.log(gameId);

      if (gameId) {
        const gameDocRef = doc(this.firestore, 'games', gameId);
        docData(gameDocRef).subscribe((gameData: any) => {
          console.log('game update', gameData);
          this.game.currentPlayer = gameData.currentPlayer;
          this.game.playedCard = gameData.playedCard;
          this.game.players = gameData.players;
          this.game.stack = gameData.stack
        });
      }
    });
  }


  async newGame() {
    const itemsCollection = collection(this.firestore, 'games');
    this.game = new Game();
    // await addDoc(itemsCollection, this.game.toJson());
    // console.log('New game started:', this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      console.log('Played card:' + this.currentCard);
      console.log('game is:', this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);

        this.pickCardAnimation = false;
      }, 1000);
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        console.log('The dialog was closed', name);
        this.game.players.push(name);
      }
    });
  }



}
