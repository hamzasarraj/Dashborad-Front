import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../core/services/application.service';
import {Application} from '../../core/model/application';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {MessageService} from "../../core/services/message.service";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  assingnedApplication: any [] = [];
  userId: string;
  constructor(private applicationService: ApplicationService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private userSerice: UserService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.applicationService.getAll().subscribe(data => {
      this.userSerice.getById(this.userId).subscribe(res => {
        data.forEach(app => {
       const  exist =    res.applications.find(appUser => appUser.id === app.id);
            let isChecked = false;
          if (exist !== undefined) {
            isChecked = true;
          }
          const assignedApp = {application: app, checked: isChecked};
          this.assingnedApplication.push(assignedApp);
        })
      }, error => console.log(error));
    }, error => console.log(error));
  }

  onCheckboxChange(item) {
    if(item.checked) {
      this.userSerice.assign(this.userId, item.application).subscribe(res => {
        this.messageService.success('Affection avec succès')
      }, error =>  console.log(error));
    } else {
      this.userSerice.unassign(this.userId, item.application).subscribe(res => {
        this.messageService.success('Désaffectation avec succès')
      }, error =>  console.log(error));
    }
  }
}
