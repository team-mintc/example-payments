![MintC Logo](https://user-images.githubusercontent.com/5517346/236246009-1621709d-3182-4462-a060-dcf417361294.png)

# Next.js + PortOne + 토스페이먼츠

본 예제에서는 토스페이먼츠를 사용했지만 PortOne V2에서 제공하는 PG사를 쉽게 변경하여 모두 사용할 수 있다.

2023.05.10 현재 사용 가능한 PG사

- 토스페이먼츠 (신모듈)
  - 연동 기능: 일반인증결제(결제창) / 비인증결제(API) / 정기결제(결제창/API) / 간편결제(결제창/다이렉트 호출)
    - 결제 수단
      - 일반인증결제: 카드 / 실시간 계좌이체 / 가상계좌 / 휴대폰 결제
      - 비인증결제(API): 카드 / 가상계좌
      - 정기결제(결제창/API): 카드
      - 간편결제(카드 결제창 노출방식): 카카오페이 / 네이버페이 / 토스페이 / 삼성페이 / SSGpay / L.Pay / LGpay
      - 간편결제(다이렉트 호출방식): 카카오페이 / 네이버페이 / 토스페이 / 삼성페이 / SSGpay / L.Pay / LGpay
- KSNET
  - 연동 가능: 일반인증결제(결제창) / 비인증결제(API) / 정기결제(API) / 간편결제(결제창/다이렉트 호출)
    - 결제 수단
      - 일반인증결제: 카드 / 실시간 계좌이체 / 가상계좌 / 휴대폰 결제
      - 비인증결제(API): 카드 / 가상계좌
      - 정기결제(API): 카드
      - 간편결제(카드 결제창 노출방식): 카카오페이 / 네이퍼페이 / 페이코 / SSG Pay / L.Pay
      - 간편결제(결제창내 간편결제 지정 노출방식): 카카오페이 / 네이퍼페이 / 페이코 / SSG Pay / L.Pay

## PortOne

![image](https://github.com/team-mintc/example-payments/assets/5517346/ca5cef3f-a2be-4194-9c88-40c55423915b)

결제 모듈을 쉽게 붙일 수 있도록 SDK를 제공한다.

새로운 버전 V2에서는 일부 PG사를 지원하지만 기존 버전에서는 모든 PG사를 연결할 수 있다.

테스트베드도 제공하며, 콘솔이 잘 구성되어 있어 유용하게 이용할 수 있다.

![image](https://github.com/team-mintc/example-payments/assets/5517346/7909dd60-428a-40df-a189-632ab218345c)

본 예제에서는 PortOne v2와 토스페이먼츠를 사용하여 결제를 구현하는 것으로 한다.

## 사전 준비

본 예제에서는 PG사 계약은 하지 않고 테스트 연동으로 진행하기로 한다.

### PortOne 회원가입

```
https://admin.portone.io/auth/signin
```

![image](https://github.com/team-mintc/example-payments/assets/5517346/3e05a205-0829-44de-a587-cb72fba7c551)

### 결제 채널 생성 (테스트 결제 채널)

콘솔 좌측 메뉴 중 결제 연동을 선택

![image](https://github.com/team-mintc/example-payments/assets/5517346/b73d8458-4055-473e-b03b-e3d051f3584a)


결제 대행사 설정 및 추가에서 다음과 같이 선택 후 추가

```
테스트 - 토스페이먼츠 - 토스페이먼츠
```

![image](https://github.com/team-mintc/example-payments/assets/5517346/4e2994fa-81c1-45c1-979a-6cea167ee90b)

![image](https://github.com/team-mintc/example-payments/assets/5517346/b859a6eb-0ecb-47ed-88a8-ff1ad60d4387)

## 설치

- PortOne API를 쉽게 사용하기 위해 PortOne SDK 패키지를 Wrapping한 @team-mintc/portone-v2를 사용한다.

```
yarn add @team-mintc/portone-v2
```

## 결제 연동

### PortOne SDK를 이용하여 결제 요청

```typescript
...
<StyledText
  // ...
  onPress={() => {
    PortOne.requestPayment({
      // 가맹점 storeId로 변경해주세요.
      storeId,
      isTestChannel: true,
      redirectUrl: 'http://192.168.50.27:3000/payment/redirect',
      orderName: productName,
      totalAmount: amount,
      pgProvider: 'PG_PROVIDER_TOSSPAYMENTS',
      payMethod: 'CARD',
      paymentId,
      taxFreeAmount,
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
      noticeUrls: ['http://192.168.50.27:3000/api/payment/hook'],
      confirmUrl: 'http://192.168.50.27:3000/payment/confirm',
      appScheme: 'portone://',
      isCulturalExpense: false,
      currency: 'CURRENCY_KRW',
      locale: 'KO_KR',
    });
  }}>
  카드 결제
</StyledText>
```

### 결제 검증 API 구현

이 API는 내부적으로 포트원의 결제내역 단건조회 API를 호출하며 크게 3단계에 따라 정상적으로 결제가 이루어졌는지를 파악한다.

1. 포트원 API를 사용하기 위한 액세스 토큰 발급 받기
2. 포트원 결제내역 단건조회 API 호출
3. 가맹점 내부 주문 데이터와 지불된 금액 비교

가맹점의 DB(본 예제에서는 FakeORM)에 저장된 값과 포트원에 저장된 값을 비교한다. 검증이 성공하면 결제정보를 데이터베이스에 저장한 뒤 결제 상태(status)에 따라 알맞은 응답을 반환하고 실패 시 에러 메세지를 출력한다.

pages/api/payment/complete.ts

```typescript
try {
  // 요청의 body로 SDK의 응답 중 txId와 paymentId가 오기를 기대합니다.
  const {txId, paymentId} = req.body;

  // 1. PortOne API Key를 통해 AccessToken을 가져옵니다.
  const portOneAPI = await initializePortOneAPI(
    process.env.PORTONE_API_KEY || '', // 포트원 API Key
  );

  // 2. 포트원 결제내역 단건조회 API 호출
  const paymentResponse = await portOneAPI.getPaymentDetails({
    payment_id: paymentId,
  });
  const {payment} = paymentResponse;
  const {id, transactions} = payment;

  // 대표 트랜잭션(승인된 트랜잭션)을 선택합니다.
  const transaction = transactions.find((tx: any) => tx.is_primary === true);
  if (!transaction) throw 'no transaction';

  // 3. 가맹점 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
  const order = await FakeORM.OrderService.findById(id);
  if (order && order.amount === transaction.amount.total) {
    switch (transaction.status) {
      case 'VIRTUAL_ACCOUNT_ISSUED': {
        // const {virtual_account} = transaction.payment_method_detail;
        // 가상 계좌가 발급된 상태입니다.
        // 계좌 정보(virtual_account)를 이용해 원하는 로직을 구성하세요.
        console.log('가상 계좌');
        break;
      }
      case 'PAID': {
        // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
        console.log('paid');
        break;
      }
    }
    res.status(200).send('ok');
  } else {
    // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
    res.status(400).send('warning: diff');
  }
} catch (e: any) {
  // 결제 검증에 실패했습니다.
  console.error('fail', e.message, e.response.data);
  res.status(400).send(e);
}
```

### 결제 완료 페이지 구현

PC는 iframe, Mobile은 redirecttion으로 지원하므로 각각 구현해야한다.

#### PC(iframe)

Desktop에서는 페이지 이동 없이 같은 페이지에서 처리하도록 한다.
결제 요청 후 받은 response 객체의 내용을 이용하여
앞서 구현한 API를 호출하여 결제 검증을 한다.

```typescript
const response = await PortOne.requestPayment({
  // ...
});

if (!response || response.code != null) {
  return alert(response?.message);
}

const validation = await axios({
  url: 'api/payment/complete', // 앞서 구현한 API 주소
  method: 'POST',
  data: {
    txId: response.txId,
    paymentId: response.paymentId,
  },
});
// 결제검증 API의 응답을 구성한 대로 결제결과를 처리하세요!
setValid(validation.data);
```

#### Mobile(redirection)

redirection된 페이지에는 다음과 같은 쿼리가 포함되어있다.

```typescript
interface PaymentResponse {
  code: 'FAILURE_TYPE_PG';
  message: string;
  paymentId: string;
  transactionType: 'PAYMENT';
  txId: string;
}
```

쿼리 내용을 이용해 앞서 구현한 API를 호출하여 결제 검증을 한다.

```typescript
const validate = useCallback(async (paymentId: string, txId: string) => {
  const validation = await axios({
    url: 'http://192.168.50.27:3000/api/payment/complete', // 앞서 구현한 API 주소
    method: 'POST',
    data: {
      txId: txId,
      paymentId: paymentId,
    },
  });
  setValid(validation.data);
}, []);

useEffect(() => {
  if (isSuccess && data) {
    validate(data.paymentId, data.txId);
  }
}, [data, isSuccess, validate]);
```

#### 위에서 작성한 결제 검증 API를 호출하여 변조된 내용이 있는지 반드시 확인을 해야한다.

## 예제 코드

[https://github.com/team-mintc/example-payments](https://github.com/team-mintc/example-payments)
