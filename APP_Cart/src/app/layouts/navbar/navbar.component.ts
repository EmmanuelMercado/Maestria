import { Component, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private offcanvasService = inject(NgbOffcanvas);

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}
}
