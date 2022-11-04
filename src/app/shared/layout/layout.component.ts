import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('bg-transparent');
      element.classList.remove('bg-black');
    } else {
      element.classList.remove('bg-transparent');
      element.classList.add('bg-black');
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
