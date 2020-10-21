import Section from "../types/Section";
import SectionRepository from "../repository/SectionRepository";
import { SectionValidator } from "../validator/SectionValidator";

export default class SectionService {
  static async getAllSections(pageNo: number, pageSize: number, sectionCount: number): Promise<any> {
    return SectionRepository.getAllSections(pageNo, pageSize, sectionCount);
  }

  static async getSectionsByCourse(
    pageNo: number,
    pageSize: number,
    sectionCount: number,
    courseId: string
  ): Promise<any> {
    return SectionRepository.getSectionsByCourse(pageNo, pageSize, sectionCount, courseId);
  }

  static async getSectionCount(): Promise<any> {
    return SectionRepository.getSectionCount();
  }
  static async getSectionCountByCourseId(courseId: string): Promise<any> {
    return SectionRepository.getSectionCountByCourseId(courseId);
  }

  static async getSectionById(sectionId: string): Promise<any> {
    return SectionRepository.getSectionById(sectionId);
  }

  static async saveSection(section: Section): Promise<any> {
    //Set number of lessons as 0 while creating the section
    section.numberOfLessons = 0;
    const validateResult = await SectionValidator.validateSection(section);
    return SectionRepository.saveSection(section);
  }

  static async updateSection(section: Section): Promise<any> {
    return SectionRepository.updateSection(section);
  }

  static async softDeleteSection(sectionId: string): Promise<any> {
    return SectionRepository.softDeleteSection(sectionId);
  }

  static async getSectionByCourseAndSectionSequence(courseId: string, sectionSequence: number): Promise<any> {
    return SectionRepository.getSectionByCourseAndPosition(courseId, sectionSequence);
  }
}
