import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class MomentDateAdapter implements NgbDateAdapter<moment.Moment> {
    fromModel(value: moment.Moment): NgbDateStruct {
        console.log(`Converting from model: ${value}`)
        if (!value) {
            return null
        }
        const result : NgbDateStruct = {
            day: value.date(),
            month: value.month() + 1,
            year: value.year()
        }
        console.log(`Created: ${result.day}-${result.month}-${result.year}`)
        return result
    }
    
    toModel(date: NgbDateStruct): moment.Moment {
        if (!date) {
            return null
        }
        return moment({date: date.day, month: date.month - 1, year: date.year})
    }


}
