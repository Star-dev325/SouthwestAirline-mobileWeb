// flow-typed signature: 561db42c34e83845f5dc5423009a4e31
// flow-typed version: da30fe6876/pluralize_v1.x.x/flow_>=v0.25.x

declare module 'pluralize' {
  declare module.exports: {
    (word: string, count?: number, inclusive?: boolean): string,

    addIrregularRule(single: string, plural: string): void,
    addPluralRule(rule: string | RegExp, replacemant: string): void,
    addSingularRule(rule: string | RegExp, replacemant: string): void,
    addUncountableRule(ord: string | RegExp): void,
    plural(word: string): string,
    singular(word: string): string
  };
}
