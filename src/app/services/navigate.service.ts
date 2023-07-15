import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router) { }

  async navigate(path: string, params?: any){
    await this.router.navigate([path,new Date().getTime()],params)
  }


}
