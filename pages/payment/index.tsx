import {View, Text} from 'react-native';
import {styled} from 'nativewind';
import {PortOne} from '@team-mintc/portone-v2';
import axios from 'axios';
import {GetServerSideProps, NextPage} from 'next';
import {useState} from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);

type Props = {
  storeId: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  return {
    props: {
      storeId: process.env.STORE_ID!,
    },
  };
};

const Payment: NextPage<Props> = ({storeId}) => {
  const [valid, setValid] = useState('');
  return (
    <StyledView className="flex-1 items-center justify-center p-10">
      <StyledText
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onPress={async () => {
          const productResponse = await axios({
            url: '/api/payment',
            method: 'get',
            params: {productId: 'example3'},
          });
          const {paymentId, amount, productName, taxFreeAmount} =
            productResponse.data;
          const response = await PortOne.requestPayment({
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
        }}>
        카드 결제
      </StyledText>
      <StyledText className="dark:text-white">검증: {valid}</StyledText>
    </StyledView>
  );
};

export default Payment;
