import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  async navigate(path: string, params?: any) {
    await this.router.navigate([path, new Date().getTime()],{ state: params })
  }

  getParamById(id: string) {
    console.log(this.router.getCurrentNavigation());
    return this.router.getCurrentNavigation()?.extras.state?.[id];
  }

  getAllParam() {
    return this.router.getCurrentNavigation()?.extras.state;
  }


}
