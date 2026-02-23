// Chinese name arrays for mock data generation
const chineseSurnames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗'];
const chineseNames = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞'];
const cities = ['北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '重庆', '武汉', '西安', '苏州', '天津', '长沙', '郑州', '济南'];
const countries = ['中国', '美国', '日本', '韩国', '英国', '法国', '德国', '加拿大', '澳大利亚', '新加坡'];
const streets = ['人民路', '中山路', '建设路', '解放路', '和平路', '友谊街', '幸福路', '光明路', '胜利路', '团结路'];

interface TypeInfo {
  type: string;
  isOptional: boolean;
  arrayType?: string;
  enumValues?: string[];
}

function parseType(fieldType: string): TypeInfo {
  const isOptional = fieldType.includes('?');
  let cleanType = fieldType.replace(/\?/g, '').trim();

  // Handle array type
  let arrayType: string | undefined;
  const arrayMatch = cleanType.match(/^(.+)\[\]$/);
  if (arrayMatch) {
    cleanType = arrayMatch[1];
    arrayType = cleanType;
  }

  // Handle union type (enum)
  let enumValues: string[] | undefined;
  const unionMatch = cleanType.match(/^enum\s*\{([^}]+)\}$/);
  if (unionMatch) {
    enumValues = unionMatch[1].split(',').map(v => v.trim().replace(/['"]/g, ''));
    cleanType = 'enum';
  }

  return {
    type: cleanType,
    isOptional,
    arrayType,
    enumValues
  };
}

function parseInterface(interfaceText: string): Map<string, Map<string, TypeInfo>> {
  const interfaces = new Map<string, Map<string, TypeInfo>>();

  // Match interface definitions
  const interfaceRegex = /interface\s+(\w+)\s*\{([^}]+)\}/g;
  let match;

  while ((match = interfaceRegex.exec(interfaceText)) !== null) {
    const interfaceName = match[1];
    const body = match[2];
    const fields = new Map<string, TypeInfo>();

    // Match field definitions
    const fieldRegex = /(\w+)(\??)\s*:\s*([^;]+);/g;
    let fieldMatch;

    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      const fieldName = fieldMatch[1];
      const isOptional = fieldMatch[2] === '?';
      const fieldType = fieldMatch[3].trim();

      fields.set(fieldName, parseType(fieldType));
    }

    interfaces.set(interfaceName, fields);
  }

  return interfaces;
}

function generateValue(typeInfo: TypeInfo, interfaceMap: Map<string, Map<string, TypeInfo>>): unknown {
  const { type, isOptional, arrayType, enumValues } = typeInfo;

  // Randomly skip optional fields
  if (isOptional && Math.random() > 0.7) {
    return undefined;
  }

  // Handle enum
  if (enumValues && enumValues.length > 0) {
    return enumValues[Math.floor(Math.random() * enumValues.length)];
  }

  // Handle arrays
  if (arrayType) {
    const length = Math.floor(Math.random() * 4) + 2; // 2-5 items
    const items: unknown[] = [];
    const itemTypeInfo: TypeInfo = { type: arrayType, isOptional: false };

    for (let i = 0; i < length; i++) {
      items.push(generateValue(itemTypeInfo, interfaceMap));
    }
    return items;
  }

  // Handle different types
  switch (type) {
    case 'string':
      return generateString();
    case 'number':
    case 'Number':
      return Math.floor(Math.random() * 100) + 1;
    case 'boolean':
    case 'Boolean':
      return Math.random() > 0.5;
    case 'enum':
      return enumValues ? enumValues[0] : 'value';
    default:
      // Check if it's a known interface (nested object)
      if (interfaceMap.has(type)) {
        return generateObject(type, interfaceMap);
      }
      return null;
  }
}

function generateString(): string {
  const random = Math.random();

  if (random < 0.3) {
    // Generate Chinese name
    const surname = chineseSurnames[Math.floor(Math.random() * chineseSurnames.length)];
    const name = chineseNames[Math.floor(Math.random() * chineseNames.length)];
    return surname + name;
  } else if (random < 0.5) {
    // Generate city
    return cities[Math.floor(Math.random() * cities.length)];
  } else if (random < 0.7) {
    // Generate street
    const num = Math.floor(Math.random() * 500) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    return `${street}${num}号`;
  } else {
    // Generate random string
    return `sample_${Math.random().toString(36).substring(7)}`;
  }
}

function generateObject(interfaceName: string, interfaceMap: Map<string, Map<string, TypeInfo>>): object {
  const fields = interfaceMap.get(interfaceName);
  if (!fields) {
    return {};
  }

  const result: Record<string, unknown> = {};

  for (const [fieldName, typeInfo] of fields) {
    const value = generateValue(typeInfo, interfaceMap);
    if (value !== undefined) {
      result[fieldName] = value;
    }
  }

  return result;
}

export async function generateMockFromTs(tsCode: string): Promise<string> {
  // Parse the TypeScript interfaces
  const interfaceMap = parseInterface(tsCode);

  if (interfaceMap.size === 0) {
    throw new Error('No valid TypeScript interface found. Please select interface definition.');
  }

  // Generate mock for the first interface found
  const firstInterface = interfaceMap.keys().next().value;
  if (!firstInterface) {
    throw new Error('Could not parse interface name.');
  }

  const mockData = generateObject(firstInterface, interfaceMap);

  // Format the output
  const mockString = `// Generated Mock Data
const mock${firstInterface} = ${JSON.stringify(mockData, null, 2)};`;

  return mockString;
}
