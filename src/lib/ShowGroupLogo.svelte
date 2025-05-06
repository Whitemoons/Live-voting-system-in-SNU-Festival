<script lang="ts">
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let groupNumber = 0;
  export let size: number = 280;

  const maskX = new Tween(0, {
    duration: 400,
    easing: cubicOut
  });

  $: if (groupNumber == 1) {
    maskX.set(size);    // animate swipe
  } else {
    maskX.set(0);
  }
</script>

<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
  <defs>
    <mask id="swipeMask">
      <rect x="0" y="0" width={maskX.current} height={size} fill="white" />
    </mask>
    <mask id="revswipeMask">
      <rect x={maskX.current} y="0" width={size - maskX.current} height={size} fill="white" />
    </mask>
  </defs>

  <image href="/honttoni_logo.svg" width={size} height={size} mask="url(#swipeMask)" />
  <image href="/HIS_logo.svg" width={size} height={size} mask="url(#revswipeMask)" />
</svg>