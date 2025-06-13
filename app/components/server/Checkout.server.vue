<script setup lang="ts">
import crypto from 'crypto';
import type { ActiveOrderFragment } from '@@/graphql/generated';
import { LockKeyhole } from 'lucide-vue-next';

type TSignaturePayment = {
  merchantAccount: string;
  merchantDomainName: string;
  orderReference: string;
  orderDate: number;
  amount: any;
  currency: string;
  namesString: string;
  quantitiesString: string;
  pricesString: string;
};

const props = defineProps<{ order: ActiveOrderFragment }>();

const runtimeConfig = useRuntimeConfig();

const names = computed(() =>
  props.order?.lines?.map((line) => line.productVariant?.product?.name)
);

const prices = computed(() =>
  props.order?.lines?.map((line) => formatCurrency(line.linePriceWithTax, true))
);

const quantities = computed(() =>
  props.order?.lines?.map((line) => line.quantity)
);

const now = Date.now();
const orderReference = ((Math.random() * (20 - 1 + 1) + 1) * now).toString();

const createSignature = (params: string[]) => {
  const signature = params.join(';');
  return crypto
    .createHmac('MD5', runtimeConfig.wayforpayMerchantSecretKey)
    .update(signature)
    .digest('hex');
};

const createPaymentSignature = (params: TSignaturePayment) => {
  const stringifyParams = Object.values(params).map((param) =>
    param.toString()
  );
  return createSignature(stringifyParams);
};

const signature = createPaymentSignature({
  merchantAccount: runtimeConfig.wayforpayMerchantAccount,
  merchantDomainName: runtimeConfig.wayforpayMerchantDomainName,
  orderReference: orderReference,
  orderDate: now,
  amount: formatCurrency(props.order?.totalWithTax, true),
  currency: 'UAH',
  namesString: names.value.join(';'),
  quantitiesString: quantities.value.join(';'),
  pricesString: prices.value.join(';'),
});
</script>

<template>
  <form id="wayforpayForm" :action="runtimeConfig.wayforpayUrl" method="POST">
    <input
      type="hidden"
      name="merchantAccount"
      :value="runtimeConfig.wayforpayMerchantAccount"
    />
    <input type="hidden" name="merchantAuthType" value="SimpleSignature" />
    <input
      type="hidden"
      name="merchantDomainName"
      :value="runtimeConfig.wayforpayMerchantDomainName"
    />
    <input type="hidden" name="orderReference" :value="orderReference" />
    <input type="hidden" name="orderDate" :value="now" />
    <input
      type="hidden"
      name="amount"
      :value="formatCurrency(order?.totalWithTax, true)"
    />
    <input type="hidden" name="currency" value="UAH" />
    <input type="hidden" name="orderTimeout" value="49000" />
    <input
      v-for="name in names"
      type="hidden"
      name="productName[]"
      :value="name"
    />
    <input
      v-for="price in prices"
      type="hidden"
      name="productPrice[]"
      :value="price"
    />
    <input
      v-for="quantity in quantities"
      type="hidden"
      name="productCount[]"
      :value="quantity"
    />
    <input type="hidden" name="merchantSignature" :value="signature" />
    <Button type="submit" size="lg" class="w-full">
      <LockKeyhole />
      Checkout
    </Button>
  </form>
</template>
