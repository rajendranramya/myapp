import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public sanitizer: DomSanitizer){}

  ngOnInit() {
  }

  files: File[];
  uploaded:File[]=[];
  

  uploadFile(event) {
    console.log(this.uploaded);
    for (let index = 0; index < event.length; index++) 
    {
     
      let file=event[index]
      const element = event[index];
      (<any>file).objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(element)));
      this.uploaded.push(file);
    console.log(element)

    }  
  }

  getFileExtension(file: File): string {
    return file.name.split('.').pop();
}


fileList(){
 
  this.files=[];
  for (let i = 0; i <this.uploaded.length; i += 1) {
    this.files.push(this.uploaded[i]);
    }
console.log(this.files)
}

  deleteAttachment(index) {
    this.uploaded.splice(index, 1)
  }
  formatSize(bytes) {
    if(bytes == 0) {
        return '0 B';
    }
    let k = 1000,
    dm = 3,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

}
