import { Controller, Get, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Grade, GradeDocument } from '../schemas/grade.schema';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import { Response } from 'express';

@Controller('reports')
export class GradeReportController {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Grade.name) private gradeModel: Model<GradeDocument>,
  ) {}

  @Get('grades/export-all')
  async exportAllGrades(@Res() res: Response) {
    try {
      const users = await this.userModel.find().populate({
        path: 'courses',
        select: 'name duration',
      });

      if (!users.length) {
        return res.status(404).json({ error: 'Користувачі не знайдені' });
      }

      const sections: any[] = [];

      for (const user of users) {
        // Fetch grades for each user
        const userGrades = await this.gradeModel
          .find({ user: user._id })
          .populate({ path: 'course', select: 'name' });

        const userParagraphs = [
          new Paragraph({
            children: [
              new TextRun({
                text: `Студент: ${user.name || 'Не вказано'}`,
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            text: `Email: ${user.email || 'Не вказано'}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Оцінки:',
            spacing: { after: 100 },
          }),
          ...userGrades.map(
            (grade) =>
              new Paragraph({
                text: `Курс: ${
                  grade.course?.name || 'Не вказано'
                }, Оцінка: ${grade.grade}, Дата: ${new Date(
                  grade.created_at,
                ).toLocaleDateString()}`,
              }),
          ),
          new Paragraph({ text: '-------------------------' }),
        ];

        sections.push({
          properties: {},
          children: userParagraphs,
        });
      }

      const doc = new Document({
        sections,
      });

      const buffer = await Packer.toBuffer(doc);

      const fileName = `Звіт-Всі-Студенти.docx`;
      const encodedFileName = encodeURIComponent(fileName);

      res.setHeader(
        'Content-Disposition',
        `attachment; filename*=UTF-8''${encodedFileName}`,
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.send(buffer);
    } catch (error) {
      console.error('Помилка експорту у Word:', error);
      res.status(500).json({ error: 'Помилка генерації файлу' });
    }
  }
}
