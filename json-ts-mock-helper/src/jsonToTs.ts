import { jsonInputForTargetLanguage, quicktype, InputData } from 'quicktype-core';

export async function convertJsonToTs(jsonString: string): Promise<string> {
  // Parse JSON to validate and get the data
  try {
    JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Invalid JSON format. Please check your JSON syntax.');
  }

  // Generate TypeScript using quicktype
  const jsonInput = jsonInputForTargetLanguage('typescript');
  await jsonInput.addSource({ name: 'RootObject', samples: [jsonString] });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    lang: 'typescript',
    rendererOptions: {
      'just-types': 'true',
    },
  });

  return result.lines.join('\n');
}
