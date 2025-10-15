import { Religion, Category, Status, Section } from '@prisma/client';

export type { Religion, Category, Status, Section };

export interface ReligionWithRelations extends Religion {
  parent?: Religion | null;
  branches?: Religion[];
  chunks?: Array<{
    id: string;
    content: string;
    section: Section;
  }>;
}

export interface ReligionCardData {
  id: string;
  name: string;
  slug: string;
  color: string;
  category: Category;
  followers?: bigint | null;
  foundedYear?: number | null;
}

