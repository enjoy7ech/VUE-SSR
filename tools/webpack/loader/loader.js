import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import _ from 'lodash'

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

// 如果一个 loader 使用外部资源（例如，从文件系统读取），必须声明它。
// 这些信息用于使缓存 loaders 无效，以及在观察模式(watch mode)下重编译。使用 addDependency 方法实现上述声明：
// this.addDependency(headerPath);

// schema.json

// {
//   "type": "object",
//   "properties": {
//     "name": {
//       "type": "string"
//     },
//     "test": {
//       "anyOf": [
//         { "type": "array" },
//         { "type": "string" },
//         { "instanceof": "RegExp" }
//       ]
//     },
//     "transform": {
//       "instanceof": "Function"
//     },
//     "sourceMap": {
//       "type": "boolean"
//     }
//   },
//   "additionalProperties": false
// }

// validateOptions
// import { getOptions } from 'loader-utils';
// import validateOptions from 'schema-utils';

// import schema from 'path/to/schema.json';

// function loader(src, map) {
//   const options = getOptions(this) || {};

//   validateOptions(schema, options, {
//     name: 'Loader Name',
//     baseDataPath: 'options',
//   });

//   // Code...
// }

// export default loader;
export default function(source, map) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'Example Loader');

  // 对资源应用一些转换……
  let res = source
  let context = source.match(/\/\/ @log \-.+/g)
  
  _.map(context,injectLine=>{
    let param = /(?<=\/\/ @log \-).+/.exec(injectLine)
    if(param && param[0]){
      res = _.replace(res,injectLine,`console.log(${param[0]})`)
      // console.log(res);
    }
  })
  return res
}