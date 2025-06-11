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
import { cartQuery } from '@/queries/cart';

const isCartOpen = useState('is-cart-open', () => false);

const { state } = useQuery(cartQuery);
</script>

<template>
  <Sheet v-model:open="isCartOpen">
    <SheetContent as="aside" side="right">
      <SheetHeader class="flex flex-row justify-between">
        <SheetTitle>{{ $t('cart') }}</SheetTitle>
        <SheetClose as-child>
          <Button type="submit">
            <CircleX />
          </Button>
        </SheetClose>
      </SheetHeader>
      <div class="grid gap-4 p-4 overflow-y-auto">
        <div v-if="state.status === 'pending'">Loading...</div>
        <div v-else-if="state.status === 'error'">
          Error fetching user info: {{ state.error.message }}
        </div>
        <ul v-else class="flex flex-col gap-8 md:gap-6">
          <li
            v-for="line in state.data.activeOrder?.lines"
            :key="JSON.stringify(line)"
            class="col-span-6 md:col-span-4"
          >
            <CartLineItem :item="line" />
          </li>
        </ul>
      </div>
      <SheetFooter>
        <Button type="submit"> <LockKeyhole /> Checkout</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
