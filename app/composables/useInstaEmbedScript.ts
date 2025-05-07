declare global {
  interface Window {
    instgrm: {
      Embeds: {
        process: any;
      };
    };
  }
}

export function useInstaEmbedScript() {
  const { locale } = useI18n();

  const startTrigger = ref(false);

  watch(
    locale,
    (newLocale, oldLocale) => {
      if (newLocale === oldLocale) return;

      startTrigger.value = true;
    },
    { immediate: true }
  );

  useScript({
    src: '//www.instagram.com/embed.js',
  });

  onMounted(() => {
    window?.instgrm?.Embeds?.process();
  });
}
