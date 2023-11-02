import {Component, OnInit, OnDestroy, Renderer2, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../core/services/auth.service";
import {MessageService} from "../../core/services/message.service";


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  loginRequest = {email: '', password: ''};

  constructor(private router: Router,
              private renderer: Renderer2,
              private authService: AuthService,
              private toastService: MessageService) {
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'white-content');
    this.renderer.addClass(document.body, 'login-page');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'white-content');
    this.renderer.removeClass(document.body, 'login-page');
  }

  login() {
    this.authService.authenticate(this.loginRequest).subscribe(res => {
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(res.user));
      this.router.navigateByUrl('/');
    }, ex => {
      this.toastService.danger('Email ou mot de passe incorrect');
      console.log(ex);
    });
  }
}
