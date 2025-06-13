<script lang="ts" setup>
import { useRemoveItemFromCart } from '@/pinia-colada/mutations/remove-from-cart';
import { PINIA_COLADA_LOADING } from '#shared/constants';

const props = defineProps<{
  id: string;
}>();

const { removeItemFromCart, asyncStatus, orderLineId } =
  useRemoveItemFromCart();

const removeItem = () => {
  orderLineId.value = props.id;
  removeItemFromCart();
};
</script>

<template>
  <div>
    <Button
      variant="link"
      @click="removeItem"
      :disabled="asyncStatus === PINIA_COLADA_LOADING && orderLineId === id"
    >
      <div>
        {{ $t('remove') }}
      </div>
    </Button>
  </div>
</template>
