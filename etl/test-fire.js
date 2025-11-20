import Firecrawl from '@mendable/firecrawl-js';

const fc = new Firecrawl({ apiKey: 'fc-test' });
console.log('Firecrawl instance created');
console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(fc)));
console.log('Instance type:', fc.constructor.name);
