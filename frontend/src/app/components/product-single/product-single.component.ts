import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-product-single',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.css'
})
export class ProductSingleComponent {
  selectedImage: string = ''; // Büyük resmin URL'si
  thumbnailImages: string[] = [ // Küçük resimlerin URL'si
    '../../../assets/img2/products/1.png',
    '../../../assets/img2/products/2.png',
    '../../../assets/img2/products/3.png',
    '../../../assets/img2/products/3.png'
  ];

  constructor() {
    // Başlangıçta ilk resmi seç
    this.selectedImage = this.thumbnailImages[0];
  }

  // Küçük resim tıklandığında büyük resmi değiştir
  changeImage(index: number) {
    this.selectedImage = this.thumbnailImages[index];
  }
}
