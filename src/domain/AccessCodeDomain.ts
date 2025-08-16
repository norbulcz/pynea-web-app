import { AccessCode } from '@/types';

export class AccessCodeDomain {
  private static readonly VALID_CODES = ['ALFA-1234', 'BETA-5678', 'GAMMA-9012'];

  static validateAccessCode(code: string): AccessCode {
    const normalizedCode = code.trim().toUpperCase();
    const isValid = this.VALID_CODES.includes(normalizedCode);
    
    return {
      code: normalizedCode,
      isValid,
    };
  }

  static getValidCodes(): string[] {
    return [...this.VALID_CODES];
  }
}
