export const calculateTax = (sumNoTax: number, taxRate: number) => {
  return (sumNoTax * taxRate) / 100;
};

export const calculateSumWithTax = (sumNoTax: number, taxRate: number) => {
  const taxAmount: number = calculateTax(sumNoTax, taxRate);
  return (sumNoTax + taxAmount).toFixed(2);
};
