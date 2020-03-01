import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Network, Org, Peer } from './models/application.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multi-org-ui';
  dynamicForm: FormGroup;
  submitted = false;
  public network: Network;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.network = new Network();
    this.network.orgdetails = new Array();
    this.dynamicForm = this.formBuilder.group({
      hostname: [''],
      orderername: [''],
      channelname: [''],
      organizations: new FormArray([])
    });
    this.setOrganizations();
  }

  createNetwork() {
    console.log(JSON.stringify(this.dynamicForm.value));
    this.network = this.dynamicForm.value;
    console.log(JSON.stringify(this.network));
  }

  addNewOrganizations() {
    let control = this.dynamicForm.controls.organizations as FormArray;
    control.push(
      this.formBuilder.group({
        orgname: [''],
        orgmsp: [''],
        caname: [''],
        peers: this.formBuilder.array([])
      })
    );
  }

  deleteOrganization(index) {
    let control = this.dynamicForm.controls.organizations as FormArray;
    control.removeAt(index);
  }

  addNewPeers(control) {
    control.push(
      this.formBuilder.group({
        peername: [''],
        peercount: [],
        usercount: []
      })
    );
  }

  deletePeer(control, index) {
    control.removeAt(index);
  }

  setOrganizations() {
    let control = this.dynamicForm.controls.organizations as FormArray;
    this.network.orgdetails.forEach(x => {
      control.push(this.formBuilder.group({
        orgname: x.orgname,
        orgmsp: x.orgmsp,
        caname: x.caname,
        peers: this.setPeers(x)
      }));
    });
  }

  setPeers(x) {
    let arr = new FormArray ([]);
    x.peerdetails.forEach(y => {
      arr.push(this.formBuilder.group({
        peername: y.peername,
        numberOfPeer: y.numberOfPeer,
        numberOfUser: y.numberOfUser
      }));
    });
    return arr;
  }

}
