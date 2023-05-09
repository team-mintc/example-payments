import {View, Text} from 'react-native';
import {styled} from 'nativewind';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

const StyledView = styled(View);
const StyledText = styled(Text);

interface PaymentResponse {
  code: 'FAILURE_TYPE_PG';
  message: string;
  paymentId: string;
  transactionType: 'PAYMENT';
  txId: string;
}

export default function PaymentResult() {
  const {query} = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(undefined as PaymentResponse | undefined);
  const [valid, setValid] = useState('');

  useEffect(() => {
    const response = query as any as PaymentResponse;
    if (response && !response.code && _.keys(response).length > 0) {
      setIsSuccess(true);
      setData(response);
    } else {
      setIsSuccess(false);
      setData(undefined);
    }
  }, [query]);

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

  return (
    <StyledView className="flex-1 items-center justify-center p-10">
      <StyledText className="dark:text-white">결과</StyledText>
      <StyledText className="dark:text-white">
        {isSuccess ? '성공' : '실패'}
      </StyledText>
      <StyledText className="dark:text-white">검증: {valid}</StyledText>
    </StyledView>
  );
}
