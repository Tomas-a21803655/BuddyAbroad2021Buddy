import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FireStorageService} from '../fire-storage.service';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, tap} from 'rxjs/operators';

export interface MyData {
    name: string;
    filepath: string;
    size: number;
}

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    constructor(public fireStorageService: FireStorageService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                public router: Router,
                public afs: AngularFirestore,
                private afStorage: AngularFireStorage,
    ) {
        this.isUploading = false;
        this.isUploaded = false;

        // Set collection where our documents/ images info will save
        this.imageCollection = afs.collection<MyData>('TripImages');
        this.images = this.imageCollection.valueChanges();
    }

    // Upload Task
    task: AngularFireUploadTask;

    // Progress in percentage
    percentage: Observable<number>;

    // Snapshot of uploading file
    snapshot: Observable<any>;

    // Uploaded File URL
    UploadedFileURL: Observable<string>;

    // Uploaded Image List
    images: Observable<MyData[]>;

    // File details
    fileName:string;
    fileSize:number;

    // Status check
    isUploading:boolean;
    isUploaded:boolean;

    public validationsForm: FormGroup;

    private imageCollection: AngularFirestoreCollection<MyData>;

    public imageFilePath;
    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            description: new FormControl('', Validators.compose([
                Validators.required
            ])),
            time: new FormControl('', Validators.compose([
                Validators.required
            ])),
            size: new FormControl('', Validators.compose([
                Validators.required
            ])),
            price: new FormControl('', Validators.compose([
                Validators.required
            ])),
            details: new FormControl('', Validators.compose([
                Validators.required
            ])),
            location: new FormControl('', Validators.compose([
                Validators.required
            ])),
        });
    }

    resetFields(){
        this.isUploading = this.isUploaded = false
        this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            size: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            details: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
        });
    }

    goback() {
        this.navCtrl.pop();
    }

    async onSubmit(value) {
        const currentUser = firebase.auth().currentUser;
        const trip: HomeTripCardsModel = {
            image: this.imageFilePath,
            rating: 0,
            name: value.name,
            description: value.description,
            time: value.time,
            size: value.size,
            price: value.price,
            details: value.details,
            createdBy: currentUser.uid,
            location: value.location,
        };
        await this.fireStorageService.createTrip(trip).then(
            () => {
                this.resetFields();
                this.router.navigate(['/tabs/bookings']);
            }
        );

    }

    // here

    uploadFile(event: FileList) {


        // The File object
        const file = event.item(0)

        // Validation for Images Only
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ')
            return;
        }

        this.isUploading = true;
        this.isUploaded = false;


        this.fileName = file.name;

        // The storage path
        const path = `tripImages/${new Date().getTime()}_${file.name}`;

        // Totally optional metadata
        const customMetadata = { app: 'created trip images' };

        // File reference
        const fileRef = this.afStorage.ref(path);

        // The main task
        this.task = this.afStorage.upload(path, file, { customMetadata });

        // Get file progress percentage
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(

            finalize(() => {
                // Get uploaded file storage path
                this.UploadedFileURL = fileRef.getDownloadURL();

                this.UploadedFileURL.subscribe(resp=>{
                    this.addImagetoDB({
                        name: file.name,
                        filepath: resp,
                        size: this.fileSize
                    });
                    this.isUploading = false;
                    this.isUploaded = true;
                },error=>{
                    console.error(error);
                })
            }),
            tap(snap => {
                this.fileSize = snap.totalBytes;
            })
        )
    }

    addImagetoDB(image: MyData) {
        // Create an ID for document
        const id = this.afs.createId();
        this.imageFilePath = image.filepath;
        // Set document id with value in database
        this.imageCollection.doc(id).set(image).then(resp => {
            console.log(resp);
        }).catch(error => {
            console.log('error ' + error);
        });
    }

}
