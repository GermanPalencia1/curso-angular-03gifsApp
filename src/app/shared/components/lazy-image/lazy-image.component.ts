import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent {

  public hasLoaded: boolean = false;

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required');
  }

  onLoad(): void {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 600);
  }

}
