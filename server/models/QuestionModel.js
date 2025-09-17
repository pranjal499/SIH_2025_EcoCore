import {Schema,model} from 'mongoose';

const quizSchema = new Schema({
  question: String,
  options: [String],
  answer: String,
  })


const Quiz = model('Quiz', quizSchema);

export default Quiz;