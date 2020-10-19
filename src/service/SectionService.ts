import Section from "../types/Section";
import SectionRepository from "../repository/SectionRepository";

export default class SectionService {
  static async getAllSections(pageNo: number, pageSize: number, sectionCount: number): Promise<any> {
    return SectionRepository.getAllSections(pageNo, pageSize, sectionCount);
  }

  static async getSectionsByCourse(pageNo: number, pageSize: number, sectionCount: number,courseId: string): Promise<any> {
    return SectionRepository.getSectionsByCourse(pageNo, pageSize, sectionCount,courseId);
  }

  static async getSectionCount(): Promise<any> {
    return SectionRepository.getSectionCount();
  }
  static async getSectionCountByCourseId(courseId:string): Promise<any> {
    return SectionRepository.getSectionCountByCourseId(courseId);
  }

  static async getSectionById(sectionId: string): Promise<any> {
    return SectionRepository.getSectionById(sectionId);
  }

  static async saveSection(section: Section): Promise<any> {
    return SectionRepository.saveSection(section);
  }

  static async updateSection(section: Section): Promise<any> {
    return SectionRepository.updateSection(section);
  }

  static async softDeleteSection(sectionId: string): Promise<any> {
    return SectionRepository.softDeleteSection(sectionId);
  }
}
