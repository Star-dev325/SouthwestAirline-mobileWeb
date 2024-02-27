const CENTS_IN_A_DOLLAR = 100;

export const centsFromDollars = (dollars) => dollars * CENTS_IN_A_DOLLAR;

export const dollarsFromCents = (cents) => cents / CENTS_IN_A_DOLLAR;
