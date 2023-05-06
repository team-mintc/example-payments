import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import * as PortOne from '@portone/browser-sdk/v2';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Payment() {
  return (
    <StyledView className="flex-1 items-center justify-center p-10">
      <StyledText
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
    </StyledView>
  );
}
