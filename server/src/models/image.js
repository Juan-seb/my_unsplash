import moongoose from 'mongoose'

const imageSchema = moongoose.Schema({
  label: {
    type: String,
    required: true,
    minlength: 10
  },
  url: {
    type: String,
    required: true
  }
}, { collection: 'images' })

imageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Image = moongoose.model('Image', imageSchema)

export default Image
