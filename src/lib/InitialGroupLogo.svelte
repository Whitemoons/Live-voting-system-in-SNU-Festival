<script lang="ts">
    import { Tween } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
  
    export let visible: boolean = true;
    export let groupNumber: number = 0;
    export let size: number = 280;

    let group = ["/honttoni_logo.svg", "/HIS_logo.svg"];

    const maskX = new Tween(0, {
      duration: 400,
      easing: cubicOut
    });
  
    $: if (visible) {
      maskX.set(size);    // animate swipe
    } else {
      maskX.set(0);
    }
  </script>
  
  <svg width={maskX.current} height={maskX.current} viewBox={`0 0 ${maskX.current} ${maskX.current}`}>
    <image href={group[groupNumber]} width={maskX.current} height={maskX.current}/>
  </svg>