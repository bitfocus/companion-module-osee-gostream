import { InputValue } from '@companion-module/base'


export enum NumberComparitor {
  Equal = 'eq',
  NotEqual = 'ne',
  LessThan = 'lt',
  LessThanEqual = 'lte',
  GreaterThan = 'gt',
  GreaterThanEqual = 'gte',
}

export function compareNumber(
  target: InputValue | undefined,
  comparitor: InputValue | undefined,
  currentValue: number
): boolean {
  const targetValue = Number(target)
  if (isNaN(targetValue)) {
    return false
  }

  switch (comparitor) {
    case NumberComparitor.GreaterThan:
      return currentValue > targetValue
    case NumberComparitor.GreaterThanEqual:
      return currentValue >= targetValue
    case NumberComparitor.LessThan:
      return currentValue < targetValue
    case NumberComparitor.LessThanEqual:
      return currentValue <= targetValue
    case NumberComparitor.NotEqual:
      return currentValue != targetValue
    default:
      return currentValue === targetValue
  }
}


