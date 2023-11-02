import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/model/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../core/services/message.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
  user: User = new User();
  users: User[];
  confirmPassword: any;
  title: string;
  currentUser = new User();
  constructor(private userService: UserService,private modalService: NgbModal,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    }, ex => console.log(ex));
  }

  add(content) {
    this.user = new User();
    this.title = 'Ajouter utilisateur';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  edit(content: any, user: User) {
    Object.assign(this.user, user);
    this.title = 'Modifier utilisateur';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  delete(content: any, user: User) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.remove(content, user.id)
    }, (reason) => {
    });
  }
  save(modal: any) {
    this.userService.save(this.user).subscribe(res => {
      this.getAll();
      this.messageService.success('Opération effectuée');
      modal.dismiss();
    }, ex => {
      this.messageService.danger(ex.error)
      console.log(ex)
    });
  }

  update(modal: any) {
    this.userService.update(this.user).subscribe(res => {
      this.getAll();
      this.messageService.success('Opération effectuée');
      modal.dismiss();
    }, ex => {
      this.messageService.danger(ex.error)
      console.log(ex)
    });
  }

  remove(modal: any, id: number) {
    this.userService.delete(id).subscribe(res => {
      this.getAll();
      this.messageService.success('Opération effectuée');
      modal.dismiss();
    }, ex => {
      this.messageService.danger(ex.error)
      console.log(ex)
    });
  }
  validate(modal: any) {
    if(this.user.id) {
      this.update(modal);
    }else {
      this.save(modal);
    }
  }
}
