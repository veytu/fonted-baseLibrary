import { parseHashUrlQuery  } from './utils'

console.log(parseHashUrlQuery('https://solutions-apaas.agora.io/apaas/demo/prod/feature_2.9.40_special.1/20240808_1333/index.html#/?name=dd'))

console.log(parseHashUrlQuery('https://solutions-apaas.agora.io/apaas/demo/prod/feature_2.9.40_special.1/20240808_1333/index.html#/?name=dd&id=7777'))

//使用全局变量
console.log('NODE_ENV',NODE_ENV);

console.log('DEMO_VERSION',DEMO_VERSION);
