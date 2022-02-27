import { Component } from '@angular/core';
import { UserService } from '../app/services/user.service'
import { take } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dockersample';
  subscriptions: Array<Subscription> = []

  constructor(private userService: UserService) {
    // this.userService.test().pipe(take(1)).subscribe(
    //   (res) => {
    //     console.log(res)
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )


    this.subscriptions.push(
      this.userService.test().pipe(take(1)).subscribe(
        (res) => {
          console.log(res)
        },
        (error) => {
          console.log(error)
        }
      )
    )
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    //Clsong All the Subscription 
    this.subscriptions.forEach((subscription, subscriptionsindex) => {
      subscription.unsubscribe()
    })
  }
}
