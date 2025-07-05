import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { Game } from '../../models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) { }

  async newGame() {
    const itemsCollection = collection(this.firestore, 'games');
    let game = new Game();
    const docRef = await addDoc(itemsCollection, game.toJson());
    console.log('Neues Spiel erstellt:', docRef);
    this.router.navigateByUrl(`/game/${docRef.id}`);
  }

}

