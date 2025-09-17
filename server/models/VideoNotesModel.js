import {Schema,model} from 'mongoose';

const videoNotesSchema = new Schema({
  notes: String,
  })


const videoNotes = model('videoNote', videoNotesSchema);

export default videoNotes;