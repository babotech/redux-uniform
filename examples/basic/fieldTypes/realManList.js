import {FieldTypes} from '../../../lib'

const validation = list => list.size >= 10

const realManList = FieldTypes.list(FieldTypes.field(), validation)

export default realManList