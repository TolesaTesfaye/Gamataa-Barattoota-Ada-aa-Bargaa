import { Request, Response, NextFunction } from "express";
import { QuizService } from "../services/quizService.js";
import { AppError } from "../middleware/errorHandler.js";

export const getQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filters = { ...req.query } as any;
    const userRole = (req as any).user?.role;
    if (userRole === "student") {
      filters.studentId = (req as any).user.userId || (req as any).user.id;
    }
    
    const quizzes = await QuizService.getQuizzes(filters);
    res.json({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    console.error("Fetch quizzes error:", error);
    next(error);
  }
};

export const getQuizById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const quiz = await QuizService.getQuizById(req.params.id);
    res.json({ success: true, data: quiz });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Fetch quiz error:", error);
    next(error);
  }
};

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const createdBy = (req as any).user.userId || (req as any).user.id;
    const quiz = await QuizService.createQuiz(req.body, createdBy);
    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Quiz Create Error:", error);
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const quiz = await QuizService.updateQuiz(req.params.id, req.body);
    res.json({ success: true, data: quiz });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Update quiz error:", error);
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await QuizService.deleteQuiz(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Delete quiz error:", error);
    next(error);
  }
};

export const submitQuizResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id;
    const result = await QuizService.submitQuizResult(
      req.params.id,
      studentId,
      req.body,
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Submission error:", error);
    next(error);
  }
};

import { Subject } from "../models/index.js";
import sequelize from "../config/database.js";

export const createAIQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id;
    const { title, description, subjectName, questions, timeLimit, passingScore } = req.body;

    // Find a subject whose name matches the subjectName case-insensitively
    let subject = await Subject.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', subjectName || '')
      )
    });
    
    // Fallback: If no subject matches, find any subject
    if (!subject) {
      subject = await Subject.findOne();
    }

    if (!subject) {
      throw new AppError(404, "No subjects found in system to associate the quiz with");
    }

    const quizData = {
      title: title || `AI Quiz: Practice`,
      description: description || `AI-generated practice quiz for ${subjectName}`,
      subjectId: subject.id,
      educationLevel: (req as any).user.studentType || 'high_school',
      questions: questions || [],
      timeLimit: timeLimit || 15,
      passingScore: passingScore || 50,
      isAiGenerated: true,
      createdBy: studentId,
    };

    const quiz = await QuizService.createQuiz(quizData, studentId);
    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("AI Quiz Create Error:", error);
    next(error);
  }
};
