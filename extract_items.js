import fs from 'fs';

const html = fs.readFileSync('fetch_site.js', 'utf-8'); // wait, I didn't save the HTML to a file.

// Let's fetch it again and process it in memory.
import https from 'https';

https.get('https://ceyizlistem.netlify.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Extract ceyizData
    const match = data.match(/let ceyizData = (\{[\s\S]*?\});\s*let state = \{\};/);
    if (match) {
      // It's a JS object literal, not strict JSON. We can evaluate it.
      const code = `return ${match[1]};`;
      const ceyizData = new Function(code)();
      
      let items = [];
      let idCounter = 1;
      
      for (const [category, products] of Object.entries(ceyizData)) {
        // Map 'Genel' to 'Diğer' since our categories are 'Mutfak' | 'Yatak Odası' | 'Banyo' | 'Elektronik' | 'Salon' | 'Dekorasyon' | 'Diğer'
        let mappedCategory = category;
        if (category === 'Genel') mappedCategory = 'Diğer';
        
        for (const product of products) {
          items.push({
            id: String(idCounter++),
            name: product.name,
            category: mappedCategory,
            price: 0, // Default price as they don't have it filled
            isBought: false,
            notes: product.notes || product.qty || ''
          });
        }
      }
      
      const typesContent = `export type Category = 'Mutfak' | 'Yatak Odası' | 'Banyo' | 'Elektronik' | 'Salon' | 'Dekorasyon' | 'Diğer';

export interface Item {
  id: string;
  name: string;
  category: Category;
  price: number;
  isBought: boolean;
  notes?: string;
}

export interface Budget {
  total: number;
}

export const CATEGORIES: Category[] = [
  'Mutfak',
  'Yatak Odası',
  'Banyo',
  'Elektronik',
  'Salon',
  'Dekorasyon',
  'Diğer',
];

export const INITIAL_ITEMS: Item[] = ${JSON.stringify(items, null, 2)};
`;

      fs.writeFileSync('./src/types.ts', typesContent);
      console.log('Successfully updated src/types.ts with ' + items.length + ' items.');
    } else {
      console.log('Could not find ceyizData in HTML');
    }
  });
});
