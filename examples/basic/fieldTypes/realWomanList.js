import {FieldTypes} from '../../../lib'

const validation = list => list.size <= 1

const realWomanList = FieldTypes.list(FieldTypes.map({
    firstName: FieldTypes.field(),
    lastName: FieldTypes.field()
}), validation)

export default realWomanList