export interface Results {
  current_page: number;
  per_page: number;
  total: number;
  data: Category[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  deleted_at: Date | null;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive: boolean;
}