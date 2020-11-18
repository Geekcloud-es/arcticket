import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const listaBonos = [
  {codigo: "1", nombre: "Enterprise 100", cantidad: 100}, 
  {codigo: "2", nombre: "StartUp 75", cantidad: 75}
]
@Component({
  selector: 'app-add-bono-horas',
  templateUrl: './add-bono-horas.component.html',
  styleUrls: ['./add-bono-horas.component.css']
})
export class AddBonoHorasComponent implements OnInit {
  public lista = listaBonos;
  selected: any;
  public bono: any
  constructor(private apollo: Apollo, @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<AddBonoHorasComponent>,) {
    this.bono = data.contrato
   }

  ngOnInit() {
  }
  
  add(){
    console.log(this.bono)
    this.apollo.mutate({
      mutation: gql`
        mutation insert($contrato: Int, $bono: bonosInput){
          addBonoHoras(bono: $bono, contrato: $contrato)
        }
      `,
      variables: {bono: this.selected, contrato: this.bono}
    }).subscribe(data => {
        console.log(this.selected);
        this.dialogRef.close();
    })
   
  }

}
