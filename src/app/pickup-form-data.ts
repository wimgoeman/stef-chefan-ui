import * as moment from 'moment'
import { Pickup } from 'api-generated'

export class PickupFormData {
    id = ''
    picker = ''
    date = moment()
    status = 'Open'

    constructor() {}
    overwriteWith(pickup: Pickup) {
        this.id = pickup.id;
        this.picker = pickup.picker;
        this.date = moment(pickup.date);
        this.status = pickup.status;
    }
}
