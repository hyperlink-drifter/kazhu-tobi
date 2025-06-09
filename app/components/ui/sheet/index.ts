import { cva, type VariantProps } from 'class-variance-authority';
export { default as Sheet } from './Sheet.vue';
export { default as SheetClose } from './SheetClose.vue';
export { default as SheetContent } from './SheetContent.vue';
export { default as SheetDescription } from './SheetDescription.vue';
export { default as SheetFooter } from './SheetFooter.vue';
export { default as SheetHeader } from './SheetHeader.vue';
export { default as SheetTitle } from './SheetTitle.vue';
export { default as SheetTrigger } from './SheetTrigger.vue';

export const sheetContentVariants = cva(
  'bg-background fixed z-50 flex flex-col gap-4 shadow-lg',
  {
    variants: {
      side: {
        left: 'inset-y-4 left-0 h-full w-full md:w-170 border-r',
        right:
          'inset-y-4 left-4 md:left-auto right-4 h-auto w-auto md:w-170 border-l',
        top: 'inset-x-0 top-0 h-auto border-b',
        bottom: 'inset-x-0 bottom-0 h-auto border-t',
      },
      slide: {
        left: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        right:
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        top: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-x-0 top-0 h-auto border-b',
        bottom:
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-x-0 bottom-0 h-auto border-t',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

export type SheetContentVariants = VariantProps<typeof sheetContentVariants>;
