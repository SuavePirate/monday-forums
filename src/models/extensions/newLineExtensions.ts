export const serializeNewLines = (input: string) => input.replace(new RegExp('\n', 'g'), '|>');
export const deserializeNewLines = (output: string) => replaceAll(output, '|>', '\n');
const replaceAll = (input: string, search: string, replace: string) => input.split(search).join(replace);