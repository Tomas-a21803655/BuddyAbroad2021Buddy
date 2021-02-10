export class HomeTripCardsModel {
    public name?: string;
    public image?:string;
    public description?: string;
    public price?: number;
    public time?: number;
    public rating?: number;


    constructor(homeTripCardsModel?: HomeTripCardsModel) {
        this.name = homeTripCardsModel ? homeTripCardsModel.name : null;
        this.image = homeTripCardsModel ? homeTripCardsModel.image : null;
        this.description = homeTripCardsModel ? homeTripCardsModel.description : null;
        this.price = homeTripCardsModel ? homeTripCardsModel.price : null;
        this.time = homeTripCardsModel ? homeTripCardsModel.time : null;
        this.rating = homeTripCardsModel ? homeTripCardsModel.rating : null;
    }
}
