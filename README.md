# Next.js + nativewind

## Next 프로젝트 생성

```
npx create-next-app example-next-nativewind
```

![image](https://user-images.githubusercontent.com/5517346/236241690-bd908723-b4f3-47f4-bcd7-7e44b2489528.png)


### 타입스크립트를 사용

프로젝트가 커지거나 라이브러리를 작성할 때 javascript는 타입을 알 수 없기 때문에 별도의 문서를 참고하여 진행 할 수 밖에 없다.

이러한 문제를 해결하기 위해 타입스크립트를 사용하여 타입을 지정하여 프로젝트가 커져 본인의 코드가 기억이 나지 않거나 협업 시 발생할 수 있는 이슈를 해결하는데 큰 도움이 되므로 반드시 타입스크립트를 사용하도록 권장한다.

### Tailwind CSS 설치
프로젝트 생성 시 옵션으로 선택하여 설치하도록 한다.
Default가 설치하는 것이다.
postcss, autoprefixer가 함께 설치된다.


## NativeWind 설치

NativeWind는 React Native에서 Tailwind CSS를 사용하도록 하는 라이브러리다.
React Native를 이용해 모바일앱을 동시에 만들때 next에서 만든 Component를 재사용할 수 있는 장점이 있기때문에 NativeWind를 사용하여 스타일링을 한다.

### React Native, React Native for Web
React Native는 모바일 Native 컴포넌트를 사용하기 때문에 React와 같은 코드를 공유하기가 어렵다.
이를 위해 react-native-web은 내부적으로 웹과 native를 다른 컴포넌트를 사용하지만 개발자는 같은 코드로 작성할 수 있도록 해준다.

### 설치

#### 패키지 설치
```
yarn add react-native react-native-web nativewind
yarn add -D @types/react-native next-transpile-modules
```

### Configuration

next.config.js
```
/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  'react-native-web',
  'nativewind',
]);

module.exports = withTM({
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    return config;
  },
});
```

tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...
  plugins: [require('nativewind/tailwind/css')],
}
```

### 예제 코드
[pages/nativewind.tsx](https://github.com/team-mintc/example-next-nativewind/blob/main/pages/nativewind.tsx)
