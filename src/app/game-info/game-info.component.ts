import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
  { title: 'Waterfall', description: 'Alle nehmen gleichzeitig einen Zug. Der Startspieler darf als Erster absetzen, dann reihum.' },
  { title: 'Du bestimmst', description: 'Du darfst bestimmen, wer den nächsten Zug nehmen muss.' },
  { title: 'High Five', description: 'Gib jemandem einen High Five. Wer nicht einschlägt, muss einen Zug nehmen.' },
  { title: 'Kifferwissen', description: 'Stelle eine Frage aus dem Bereich Cannabis. Wer falsch antwortet, nimmt einen Zug.' },
  { title: 'Munchies', description: 'Alle nehmen einen Snack. Wer nichts hat, nimmt zwei Züge.' },
  { title: 'Gute Laune', description: 'Erzähle einen lustigen Weed-Moment. Wer keinen einfällt, nimmt einen Zug.' },
  { title: 'Dealer', description: 'Du bist Dealer: Bestimme reihum, wer einen Zug bekommt.' },
  { title: 'Stoner Rule', description: 'Erfinde eine neue Regel fürs Spiel – z.B. immer vor dem Zug einen Spruch sagen.' },
  { title: 'Pantomime', description: 'Stelle ein Cannabis-typisches Verhalten pantomimisch dar. Wer es nicht errät, nimmt einen Zug.' },
  { title: 'Green Quiz', description: 'Stelle eine Quizfrage zu Cannabis (Sorten, Geschichte, Gesetze, etc.). Wer falsch liegt, nimmt einen Zug.' },
  { title: 'Shotgun', description: 'Gebe einer Person einen Zug per Shotgun. Wer ablehnt, nimmt zwei Züge.' },
  { title: 'Who’s Got the Fire?', description: 'Die Person mit dem Feuerzeug gibt an die rechte Person ab und beide nehmen einen Zug.' },
  { title: 'Never have I ever... 420-Edition', description: 'Sage etwas, das du in Bezug auf Cannabis nie gemacht hast. Wer es gemacht hat, nimmt einen Zug.' },
  { title: 'Puff Puff Pass', description: 'Gib den Joint/Pfeife etc. an eine beliebige Person. Diese Person nimmt einen Zug und gibt weiter.' },
  { title: 'Storytime', description: 'Erzähle eine lustige oder peinliche Weed-Story. Bei Ausrede gibt’s einen Zug.' },
  { title: 'Kiffen verboten!', description: 'Für eine Runde darf niemand kiffen. Wer es doch tut, nimmt zwei Züge.' },
  { title: 'Stoner’s Challenge', description: 'Du forderst jemanden heraus (z.B. Wer länger den Rauch halten kann). Verlierer nimmt zwei Züge.' },
  { title: 'Roll Battle', description: 'Drei Freiwillige haben 3 Minuten Zeit, einen Joint zu drehen. Die Gruppe stimmt ab: Der Schlechteste nimmt zwei Züge.' },
  { title: 'Chill-Modus', description: 'Alle entspannen kurz, Musik an, 1 Minute Pause, dann geht’s weiter.' }
];
  title: string = "";
  description: string = "";
  @Input() card: String = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
    console.log('current card: ', this.card);
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title;
    this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}