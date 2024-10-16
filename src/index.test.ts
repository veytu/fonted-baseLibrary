import { parseHashUrlQuery  } from './utils';

//测试用例
test('parseHashUrlQuery test',()=>{
    expect(parseHashUrlQuery('https://solutions-apaas.agora.io/apaas/demo/prod/feature_2.9.40_special.1/20240808_1333/index.html#/?name=dd')).toEqual({name: 'dd'})
})

