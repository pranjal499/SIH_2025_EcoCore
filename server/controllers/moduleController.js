import Module from '../models/ModuleModel.js';
import Quiz from '../models/QuestionModel.js';
import Topic from '../models/TopicModel.js';
import VideoNotes from '../models/VideoNotesModel.js';
import {generateNotesAndQuiz} from '../utils/generateNotesAndQuiz.js'

export const getModules = async (req, res) => {
  try {
    const modules = await Module.find().populate({
        path: 'topics',
    });
    
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { title, youtubeURL, moduleId } = req.body;

    const { notes, quiz } = await generateNotesAndQuiz( youtubeURL);
    const notesCollection = await VideoNotes.insertOne({notes});
    const quizCollection =  await Quiz.insertMany(quiz);
    const newTopic = await Topic.create({
      title,
      youtubeURL,
      module: moduleId,
      questions: quizCollection.map(q => q._id),
      videoNotes: notesCollection._id,
    });
    await Module.findByIdAndUpdate(moduleId,{$push:{topics:newTopic._id}});

    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
