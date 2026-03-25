import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AlertService, AlertState } from '../alert-service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-alert-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css',
})

export class AlertComponent implements OnDestroy {
    alert: AlertState = { 
    type: 'success',
    message: '',
    show: false
  };
  private sub!: Subscription;

  constructor(private alertService: AlertService) {
    this.sub = this.alertService.alert$.subscribe((res) => {
      this.alert = res;

      if(res.show){
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
  close() {
    this.alertService.clear();
  }
}