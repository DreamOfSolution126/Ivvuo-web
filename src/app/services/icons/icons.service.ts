import { Injectable } from '@angular/core';

@Injectable()
export class IconsService {

  private allIcons: any = [
    {
      name: 'hands',
      icon: '<i class="fas fa-hands"></i>'
    },
    {
      name: 'list-ol',
      icon: '<i class="fas fa-list-ol"></i>'
    },
    {
      name: 'cash-register',
      icon: '<i class="fas fa-cash-register"></i>'
    },
    {
      name: 'car-crash',
      icon: '<i class="fas fa-car-crash"></i>'
    },
    {
      name: 'history',
      icon: '<i class="fas fa-history"></i>'
    },
    {
      name: 'video',
      icon: '<i class="fas fa-video"></i>'
    },
    {
      name: 'microphone-alt',
      icon: '<i class="fas fa-microphone-alt"></i>'
    },
    {
      name: 'ambulance',
      icon: '<i class="fas fa-ambulance"></i>'
    },
    {
      name: 'bus',
      icon: '<i class="fas fa-bus"></i>'
    },
    {
      name: 'car',
      icon: '<i class="fas fa-car"></i>'
    },
    {
      name: 'car-battery',
      icon: '<i class="fas fa-car-battery"></i>'
    },
    {
      name: 'gas-pump',
      icon: '<i class="fas fa-gas-pump"></i>'
    },
    {
      name: 'tractor',
      icon: '<i class="fas fa-tractor"></i>'
    },
    {
      name: 'warehouse',
      icon: '<i class="fas fa-warehouse"></i>'
    },
    {
      name: 'address-book',
      icon: '<i class="fas fa-address-book"></i>'
    },
    {
      name: 'address-card',
      icon: '<i class="fas fa-address-card"></i>'
    },
    {
      name: 'envelope',
      icon: '<i class="fas fa-envelope"></i>'
    },
    {
      name: 'phone-volume',
      icon: '<i class="fas fa-phone-volume"></i>'
    },
    {
      name: 'phone-square',
      icon: '<i class="fas fa-phone-square"></i>'
    },
    {
      name: 'glasses',
      icon: '<i class="fas fa-glasses"></i>'
    },
    {
      name: 'bullhorn',
      icon: '<i class="fas fa-bullhorn"></i>'
    },
    {
      name: 'gas-pump',
      icon: '<i class="fas fa-gas-pump"></i>'
    },
    {
      name: 'dollar-sign',
      icon: '<i class="fas fa-dollar-sign"></i>'
    },
    {
      name: 'compac-disc',
      icon: '<i class="fas fa-compact-disc"></i>'
    }
  ]
  constructor() { }

  getAllIcons(): Array<this>{
    return this.allIcons;
  }

}
