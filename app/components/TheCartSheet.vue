<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const isCartOpen = useState('is-cart-open', () => false);
</script>

<template>
  <Sheet v-model:open="isCartOpen">
    <SheetContent as="aside" side="right">
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetClose as-child>
          <Button type="submit"> <CircleX /> </Button>
        </SheetClose>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">Name</div>
        <div class="grid grid-cols-4 items-center gap-4">Username</div>
      </div>
      <SheetFooter>Checkout</SheetFooter>
    </SheetContent>
  </Sheet>
</template>
