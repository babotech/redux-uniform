const extractValue = field =>
    field.has(`list`) ? field.get(`list`).map(i => i.has(`value`) ? i.get(`value`) : extractValue(i)) :
        field.has(`map`) ? field.get(`map`).map(extractValue) :
            field.get(`value`)

const extractValues = fields =>
    fields.map(extractValue).toJS()

export default extractValues