import { Component, OnInit } from '@angular/core';
import { House } from '../../interfaces/house.interface';
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit{

  houses!: House[];
  constructor(private houseService: HouseService){}

  ngOnInit() {
    this.houseService.listHouses().subscribe({
      next: (resp) => {
        this.houses = resp?.data['house']!;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
