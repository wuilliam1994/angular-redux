import { Component, OnInit } from '@angular/core';
import { House } from '../../interfaces/house.interface';
import { HouseService } from '../../services/house.service';
import { HouseDataService } from '../../services/house-data.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnInit {

  listHouseHeaders: string[] = ['Name', 'Cantidad Tables', 'Fecha Creacion'];

  constructor(private houseService: HouseService, public houseDataService: HouseDataService) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private async loadData() {
    this.houseService.listHouses().subscribe({
      next: (resp) => {
        this.houseDataService.setListHouse = resp?.data['house'] || [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
