import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,
            CommonModule
  ],
})
export class HomePage implements OnInit {

  public characters: any[] = [];
  public currentPage: number = 1; 
  public totalPages: number = 1;  
  private currentSearchTerm: string = ''; 

  constructor(private apiService: ApiService) {}

 ngOnInit() {
    this.searchCharacters(); 
  }

  
  searchCharacters(page: number = 1) {
    this.currentPage = page; 

    this.apiService.getCharacters(this.currentSearchTerm, this.currentPage)
      .pipe(
        catchError((error: any) => {
          console.error('Erro na busca:', error);
          this.characters = [];
          this.totalPages = 1; 
          this.currentPage = 1;
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data && data.info) {
          this.characters = data.results;
          this.totalPages = data.info.pages;
        }
      });
  }


  handleSearch(event: any) {
    this.currentSearchTerm = event.target.value;
    this.searchCharacters(1); 
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.searchCharacters(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.searchCharacters(this.currentPage - 1);
    }
  }
}