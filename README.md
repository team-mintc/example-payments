![MintC Logo](https://user-images.githubusercontent.com/5517346/236246009-1621709d-3182-4462-a060-dcf417361294.png)


# Next.js + PortOne + 토스페이먼츠

## PortOne
image.png

결제 모듈을 쉽게 붙일 수 있도록 SDK를 제공한다.

새로운 버전 V2에서는 일부 PG사를 지원하지만 기존 버전에서는 모든 PG사를 연결할 수 있다.

테스트베드도 제공하며, 콘솔이 잘 구성되어 있어 유용하게 이용할 수 있다.

console image

본 예제에서는 PortOne v2와 토스페이먼츠를 사용하여 결제를 구현하는 것으로 한다.

## 사전 준비
본 예제에서는 PG사 계약은 하지 않고 테스트 연동으로 진행하기로 한다.

### PortOne 회원가입
```
https://admin.portone.io/auth/signin
```
이미지

### 결제 채널 생성 (테스트 결제 채널)
콘솔 좌측 메뉴 중 결제 연동을 선택

이미지

결제 대행사 설정 및 추가에서 다음과 같이 선택 후 추가

```
테스트 - 토스페이먼츠 - 토스페이먼츠
```

이미지

결과 이미지

## 설치

```
yarn add @portone/browser-sdk
```

## 결제 연동

```javascript
...
<StyledText
  // ...
  onPress={() => {
    PortOne.requestPayment({
      // 가맹점 storeId로 변경해주세요.
      storeId: 'store-9bf6076d-beef-4729-9521-ae66c14e0569',
      isTestChannel: true,
      redirectUrl: 'http://localhost:3000/payment/redirect',
      orderName: '나이키 와플 트레이너 2 SD',
      totalAmount: 1000,
      pgProvider: 'PG_PROVIDER_TOSSPAYMENTS',
      payMethod: 'CARD',
      paymentId: 'paymentId_now',
      taxFreeAmount: 300,
      customer: {
        customerId: 'customerId_now',
        fullName: '신현성',
        phoneNumber: '1670-5176',
        email: 'test@portone.io',
        zipcode: '04783',
      },
      windowType: {
        pc: 'IFRAME',
        mobile: 'REDIRECTION',
      },
      noticeUrls: ['http://localhost:3000/api/payment/hook'],
      confirmUrl: 'http://localhost:3000/payment/confirm',
      appScheme: 'portone://',
      isCulturalExpense: false,
      currency: 'CURRENCY_KRW',
      locale: 'KO_KR',
    });
  }}>
  카드 결제
</StyledText>
```


### 예제 코드
[https://github.com/team-mintc/example-payments](https://github.com/team-mintc/example-payments)
