// import './variable.scss';

//模块a中使用import './index.scss'导入了index.scss
//index.scss中使用了variable.scss中的变量
//虽然视觉上variable.scss最先导入，但是index.scss中是取不到variable.scss中的变量的

// import './a';

//webpack打包后报错
/**
 * ERROR in ../~/css-loader!../~/sass-loader!./src/style.scss
Module build failed:
        border: $border-light;
        ^
      Undefined variable: "$border-light".
      in /Users/dulin/workspace/webpack-summer/sass-loader/src/style.scss (line 2, column 10)
 @ ./src/style.scss 4:14-122
 */


import './index.scss';
import './button.scss';
