import {Schema,model} from 'mongoose';

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }]
});

const Module = model('Module', moduleSchema);

export default Module;