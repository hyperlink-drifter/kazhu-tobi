<script lang="ts" setup>
import { CircleX, LockKeyhole } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cartQuery } from '@/pinia-colada/queries/cart';

const isCartOpen = useState('is-cart-open', () => false);

const { state } = useQuery(cartQuery);

const hasLines = computed(() => state.value.data?.activeOrder?.totalQuantity);
const checkout = () => {
  $fetch('/api/checkout', {
    method: 'POST',
    body: {
      dki: true,
    },
  });
};
</script>

<template>
  <Sheet v-model:open="isCartOpen">
    <SheetContent as="aside" side="right">
      <SheetHeader class="flex flex-row justify-between">
        <SheetTitle>{{ $t('cart') }}</SheetTitle>
        <SheetClose as-child v-if="hasLines">
          <Button>
            <CircleX />
          </Button>
        </SheetClose>
      </SheetHeader>
      <template v-if="hasLines">
        <div class="grid gap-4 p-4 overflow-y-auto">
          <div v-if="state.status === 'error'">
            Error fetching user info: {{ state.error.message }}
          </div>
          <ul v-else class="flex flex-col gap-8 md:gap-6">
            <li
              v-for="line in state.data?.activeOrder?.lines"
              :key="JSON.stringify(line)"
              class="col-span-6 md:col-span-4"
            >
              <CartLineItem :item="line" />
            </li>
          </ul>
        </div>
      </template>
      <SheetFooter>
        <template
          v-if="
            state.data?.activeOrder?.lines.length &&
            state.data?.activeOrder?.lines.length > 0
          "
        >
          <div class="flex justify-between">
            <span>{{ $t('total') }}</span>
            <span>
              {{ formatCurrency(state.data?.activeOrder?.subTotalWithTax) }}
            </span>
          </div>
          <ServerCheckout :order="state.data.activeOrder" />
        </template>
        <template v-else>
          <p>
            {{ $t('your-cart-is-empty') }}
          </p>
          <SheetClose as-child>
            <Button variant="default" size="lg" class="w-full">
              {{ $t('continue-shopping') }}
              <CircleX />
            </Button>
          </SheetClose>
        </template>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
