import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  email,
  form,
  FormField,
  required,
  submit,
} from '@angular/forms/signals'
import { Button } from '../../components/ui/button'

interface LoginData {
  email: string
  password: string
}

@Component({
  selector: 'app-forms-2',
  template: `
    <form class="flex flex-col gap-3 h-full" (submit)="onSubmit($event)">
      <div class="grid w-full max-w-sm items-center gap-2">
        <label
          for="email"
          class="cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          class="cn-input placeholder:text-muted-foreground w-full min-w-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          [formField]="loginForm.email"
        />
        @if (loginForm.email().touched() && loginForm.email().invalid()) {
          <ul class="error-list">
            @for (error of loginForm.email().errors(); track error) {
              <li>{{ error.message }}</li>
            }
          </ul>
        }
      </div>
      <div class="grid w-full max-w-sm items-center gap-2">
        <label
          for="password"
          class="cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          class="cn-input placeholder:text-muted-foreground w-full min-w-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          [formField]="loginForm.password"
        />

        @if (loginForm.password().touched() && loginForm.password().invalid()) {
          <ul class="error-list">
            @for (error of loginForm.password().errors(); track error) {
              <li>{{ error.message }}</li>
            }
          </ul>
        }
      </div>
      <button type="submit" appButton>Log In</button>
    </form>
  `,
  imports: [Button, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2 {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  })

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' })
    email(schemaPath.email, { message: 'Enter a valid email address' })
    required(schemaPath.password, { message: 'Password is required' })
  })

  async onSubmit(event: Event) {
    event.preventDefault()
    await submit(this.loginForm, async () => {
      const credentials = this.loginModel()
      // In a real app, this would be async:
      // await this.authService.login(credentials);
      console.log('Logging in with:', credentials)
    })
  }
}
